// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    try {
      // 1. Set Public Permissions -------------------------------------------
      const publicRole = await strapi
        .query("plugin::users-permissions.role")
        .findOne({ where: { type: "public" } });

      const permissionsToEnable = [
        "api::bracelet.bracelet",
        "api::category.category",
        "api::earring.earring",
        "api::jewelery.jewelery",
        "api::jewelry.jewelry",
        "api::necklace.necklace",
        "plugin::upload.content-api", // Allow public access to upload (fetch images)
      ];

      const actions = ["find", "findOne"];

      let count = 0;
      for (const controller of permissionsToEnable) {
        for (const action of actions) {
          // Skip 'plugin::upload.content-api' for the generic loop if needed, 
          // or handle specific actions for upload if they differ (usually 'find', 'findOne', 'destroy' etc)
          // For upload, usually it's `plugin::upload.content-api.find` etc.
          // But for simplicity let's stick to the generated APIs.
          if (controller.startsWith("plugin::")) continue;

          const actionName = `${controller}.${action}`;
          const existing = await strapi
            .query("plugin::users-permissions.permission")
            .findOne({
              where: {
                action: actionName,
                role: publicRole.id,
              },
            });

          if (!existing) {
            await strapi.query("plugin::users-permissions.permission").create({
              data: {
                action: actionName,
                role: publicRole.id,
              },
            });
            count++;
          }
        }
      }

      if (count > 0) {
        console.log(`🚀 Automatically enabled public read permissions for ${count} endpoints.`);
      }

      // 2. Enable Order Permissions for both Public and Authenticated roles
      const rolesToUpdate = ["public", "authenticated"];
      const orderActions = ["create", "find", "findOne"];

      console.log('🔧 Setting up Order API permissions...');

      for (const roleType of rolesToUpdate) {
        const role = await strapi
          .query("plugin::users-permissions.role")
          .findOne({ where: { type: roleType } });

        if (role) {
          console.log(`📋 Processing ${roleType} role (ID: ${role.id})...`);

          for (const action of orderActions) {
            const actionName = `api::order.order.${action}`;

            try {
              const existing = await strapi
                .query("plugin::users-permissions.permission")
                .findOne({
                  where: { action: actionName, role: role.id },
                });

              if (!existing) {
                await strapi.query("plugin::users-permissions.permission").create({
                  data: {
                    action: actionName,
                    role: role.id,
                    enabled: true
                  },
                });
                console.log(`✅ Created and enabled ${actionName} for ${roleType} role`);
              } else {
                // Update to ensure it's enabled
                await strapi.query("plugin::users-permissions.permission").update({
                  where: { id: existing.id },
                  data: { enabled: true },
                });
                console.log(`✅ Ensured ${actionName} is enabled for ${roleType} role`);
              }
            } catch (error) {
              console.error(`❌ Error setting permission ${actionName} for ${roleType}:`, error.message);
            }
          }
        } else {
          console.error(`❌ Role ${roleType} not found!`);
        }
      }

      // 3. Seed Data --------------------------------------------------------
      const fs = require('fs');
      const path = require('path');

      // Robustly find the images directory
      // We need to reach ../ak-frontend/public/images
      // Depending on if we are in /src or /dist/src
      const possiblePaths = [
        path.join(__dirname, '..', '..', 'public', 'images'),       // From src
        path.join(__dirname, '..', '..', '..', 'public', 'images'), // From dist/src
        path.join(process.cwd(), '..', 'public', 'images')          // From process.cwd() (akBackend)
      ];

      let imagesDir = null;
      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          imagesDir = p;
          break;
        }
      }

      if (!imagesDir) {
        console.log('⚠️ Images directory not found. Checked:', possiblePaths);
        console.log('Skipping seeding.');
        return;
      } else {
        console.log('📂 Found images at:', imagesDir);
      }

      const seedData = {
        "api::necklace.necklace": [
          { name: "Ethiopian Coptic Cross Necklace", price: 4500, description: "A beautifully detailed silver Coptic Cross pendant on a woven cord.", material: "Silver 925", image: "necklace-category.jpg" },
          { name: "Axum Obelisk Pendant", price: 5200, description: "A gold-plated pendant inspired by the ancient Obelisk of Axum.", material: "Gold Plated", image: "product-1.jpg" },
          { name: "Lalibela Rock Cross", price: 3800, description: "Intricate cross design inspired by the rock-hewn churches of Lalibela.", material: "Silver & Bronze", image: "product-3.jpg" }
        ],
        "api::earring.earring": [
          { name: "Wollo Opal Drop Earrings", price: 6500, description: "Genuine Wollo opals set in handcrafted silver frames.", material: "Silver & Opal", image: "earrings-category.jpg" },
          { name: "Filigree Gold Studs", price: 8000, description: "Traditional Ethiopian filigree work in 18k gold.", material: "18k Gold", image: "product-2.jpg" },
          { name: "Silver Telus Earrings", price: 2500, description: "Classic silver earrings with traditional Telus design.", material: "Silver", image: "product-4.jpg" }
        ],
        "api::bracelet.bracelet": [
          { name: "Dina Silver Cuff", price: 3200, description: "Hammered silver cuff bracelet with engraved patterns.", material: "Silver", image: "bracelet-category.jpg" },
          { name: "Woven Fiber & Gold Bracelet", price: 1500, description: "Traditional woven fiber bracelet with gold accents.", material: "Fiber & Gold", image: "product-1.jpg" }
        ],
        "api::jewelery.jewelery": [ // Rings
          { name: "Royal Signet Ring", price: 9000, description: "A heavy gold signet ring featuring the Lion of Judah.", material: "21k Gold", image: "ring-category.jpg" },
          { name: "Habesha Wedding Band", price: 12000, description: "Intricate wedding band handcrafted by master artisans.", material: "21k Gold", image: "product-3.jpg" }
        ]
      };

      for (const [uid, items] of Object.entries(seedData)) {
        if (!strapi.db.query(uid)) continue;

        try {
          // Delete existing entries to start fresh
          console.log(`🗑️ Clearing existing items for ${uid}...`);
          await strapi.db.query(uid).deleteMany({});
        } catch (e) {
          console.error(`⚠️ Failed to clear ${uid}:`, e.message);
        }

        console.log(`🌱 Seeding ${uid}...`);

        for (const item of items) {
          const imagePath = path.join(imagesDir, item.image);
          let uploadedFiles = null;

          if (fs.existsSync(imagePath)) {
            const fileSize = fs.statSync(imagePath).size;
            const fileName = path.basename(imagePath);

            const uploadService = strapi.plugin('upload').service('upload');

            try {
              // Check if file already uploaded
              const existingFiles = await strapi.db.query('plugin::upload.file').findMany({
                where: { name: fileName }
              });

              if (existingFiles.length > 0) {
                uploadedFiles = [existingFiles[0]];
              } else {
                // Create a robust file object that works across Strapi versions
                const fileStat = fs.statSync(imagePath);

                uploadedFiles = await uploadService.upload({
                  data: {
                    fileInfo: { name: fileName, caption: fileName, alternativeText: fileName }
                  },
                  files: {
                    path: imagePath, // Satisfy path check
                    name: fileName,
                    type: 'image/jpeg', // One variant
                    mime: 'image/jpeg', // Another variant
                    mimetype: 'image/jpeg', // Common variant
                    size: fileStat.size,
                    buffer: fs.readFileSync(imagePath), // Provide content directly
                  }
                });
              }
            } catch (e) {
              console.error(`⚠️ Failed to upload image ${fileName}:`, e.message);
            }
          }

          // Create new item
          console.log(`✨ Creating new item: ${item.name}`);
          await strapi.entityService.create(uid, {
            data: {
              name: item.name,
              slug: item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              price: item.price,
              description: item.description,
              material: item.material,
              featured: true,
              publishedAt: new Date(),
              images: uploadedFiles ? [uploadedFiles[0].id] : []
            }
          });
        }
      }

    } catch (error) {
      console.error("Bootstrap error:", error);
    }
  },
};
