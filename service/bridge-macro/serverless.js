const { Component } = require("@serverless/core");

/**
 * Will deploy the serverless component
 */
class Deploy extends Component {
  async default(inputs = {}) {
    const { stage } = inputs;
    if (stage === "dev" || stage === "live") {
      // Will load env-${stage} as environment variables
      require("dotenv").config({ path: `${__dirname}/.env-${stage}` });
      console.log(
        "stage:",
        stage,
        " ENV:",
        process.env.NEXT_PUBLIC_ENV,
        " S3_BUCKET:",
        process.env.AWS_S3_BUCKET
      );

      const template = await this.load("@serverless/template", stage);
      const output = await template({ template: "serverless.yml" });
      return output;
    } else {
      this.context.log("No environment defined... Choices are dev, live");
    }
  }

  // Remove will allow the stage to be set on the command line
  // run like so: serverless remove --stage=testnet
  async remove(inputs = {}) {
    const { stage } = inputs;
    if (stage === "dev" || stage === "live") {
      const template = await this.load("@serverless/template", stage);
      const output = await template.remove();
      return output;
    }
  }
}

module.exports = Deploy;
