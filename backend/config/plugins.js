module.exports = ({ env }) => ({
    graphql: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: "dsdkyjbiz",
          api_key: "438247819165877",
          api_secret: "41Y91Ed5SlE-1k3ZGYcjkkH4DGA",
        },
      },
    },
  });