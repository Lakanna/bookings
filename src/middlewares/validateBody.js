import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    const clientId = req.user?._id.toString();

    const body = clientId ? { clientId, ...req.body } : req.body;

    const dataToValidate = { ...body, ...req.params };

    await schema.validateAsync(dataToValidate, { abortEarly: false });
    next();
  } catch (err) {
    const error = createHttpError(400, 'Bad request', { errors: err.details });
    next(error);
  }
};
