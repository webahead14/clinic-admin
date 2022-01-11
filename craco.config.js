const CracoLessPlugin = require("craco-less");

// If you change the color, you will need to rerun npm start
// to find all of the variable names go to this link
// github.com/ant-design/ant-design/blob/master/components/style/themes/default.less

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // Change ant design variables here
            modifyVars: {
              "@primary-color": "#0092c5",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
