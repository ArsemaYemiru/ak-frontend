import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
    async create(ctx) {
        // @ts-ignore
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized('You must be logged in to place an order.');
        }

        const { data } = ctx.request.body;

        // Ensure valid data
        if (!data) {
            return ctx.badRequest('Missing data payload');
        }

        try {
            // Use Entity Service to bypass controller sanitization
            const newOrder = await strapi.entityService.create('api::order.order', {
                data: {
                    ...data,
                    user: user.id,
                    publishedAt: new Date(), // Ensure it's published immediately
                },
            });

            const sanitizedEntity = await this.sanitizeOutput(newOrder, ctx);
            return this.transformResponse(sanitizedEntity);
        } catch (error) {
            return ctx.badRequest('Error processing order', { error: error.message });
        }
    },

    async find(ctx) {
        // @ts-ignore
        const user = ctx.state.user;

        if (!user) {
            return ctx.unauthorized('You must be logged in to view your orders.');
        }

        console.log(`Fetching orders for user: ${user.id}`);

        try {
            const entries = await strapi.entityService.findMany('api::order.order', {
                filters: {
                    user: {
                        id: user.id
                    }
                },
                populate: '*',
                sort: { createdAt: 'desc' },
            });

            console.log(`Found ${entries ? entries.length : 0} orders for user ${user.id}`);

            const sanitizedEntity = await this.sanitizeOutput(entries, ctx);
            return this.transformResponse(sanitizedEntity);
        } catch (error) {
            console.error('Find Error:', error);
            return ctx.badRequest('Error fetching orders');
        }
    }
}));
