export default async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    const preferredType = ctx.accepts('html', 'json');

    if (e.status) {
      ctx.status = e.status;

      if (preferredType === 'json') {
        ctx.body = {
          error: e.message
        };
      } else {
        ctx.body = e.message;
      }

    } else if (e.name === 'ValidationError' || e === 'ValidationError') {


      ctx.status = 400;

      const errors = {};

      for (const field in e.errors) {
        if ({}.hasOwnProperty.call(e.errors, field)) {
          errors[field] = e.errors[field].message;
        }

      }

      if (preferredType === 'json') {
        ctx.body = {
          errors
        };
      } else {
        ctx.body = {
          errors
        };
      }
    } else {
      ctx.status = 500;
      ctx.body = e.message;
      console.error(e.message, e.stack);
    }

  }
};
