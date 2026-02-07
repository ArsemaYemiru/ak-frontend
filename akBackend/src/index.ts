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



    } catch (error) {
      console.error("Bootstrap error:", error);
    }
  },
};
