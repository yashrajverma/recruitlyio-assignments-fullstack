const { AzureOpenAI } = require("openai");
require("dotenv").config();

const endpoint =
  process.env["AZURE_OPENAI_ENDPOINT"] ||
  "https://yashv-majbec85-eastus2.openai.azure.com/";
const apiKey = process.env["AZURE_OPENAI_API_KEY"] || "";
const apiVersion = "2025-01-01-preview";
const deployment = process.env["AZURE_OPENAI_MODEL"] || "gpt-4o-mini";

const client = new AzureOpenAI({
  endpoint,
  apiKey,
  apiVersion,
  deployment,
});

module.exports = client;
