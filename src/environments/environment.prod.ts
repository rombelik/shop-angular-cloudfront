import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product: 'http://rombelik-cart-api-dev.eu-west-1.elasticbeanstalk.com',
    order: 'http://rombelik-cart-api-dev.eu-west-1.elasticbeanstalk.com',
    import: 'https://b8hevac9zk.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'http://rombelik-bff-api-dev.eu-west-1.elasticbeanstalk.com',
    cart: 'http://rombelik-cart-api-dev.eu-west-1.elasticbeanstalk.com'
  },
  apiEndpointsEnabled: {
    product: true,
    order: true,
    import: true,
    bff: false,
    cart: true,
  },
};
