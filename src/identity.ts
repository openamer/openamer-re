/**
 * Canonical public identity shared by packaging, setup, MCP, and skill install.
 * Centralization prevents persistent client registrations from drifting from
 * the npm package or executable exposed in package.json.
 *
 * OpenAmer RE — fork of REA (https://github.com/morluto/rea, MIT).
 * The upstream copyright notice is retained in LICENSE and NOTICE.
 */
export const PRODUCT_IDENTITY = {
  displayName: "OpenAmer RE",
  packageName: PACKAGE_METADATA.name,
  packageSpecifier: `${PACKAGE_METADATA.name}@latest`,
  registrationPackageSpecifier: `${PACKAGE_METADATA.name}@${PACKAGE_METADATA.version}`,
  packageVersion: PACKAGE_METADATA.version,
  cliBinary: "oare",
  mcpCommand: `npx -y ${PACKAGE_METADATA.name}@${PACKAGE_METADATA.version} mcp`,
  mcpServerKey: "openamer-re",
  skillName: "openamer-reverse-engineer",
  skillVersion: PACKAGE_METADATA.skillVersion,
  configFileName: "openamer-re.json",
} as const;

/** Exact SDK package identities, distinct from negotiated protocol version. */
export const SDK_IDENTITY = {
  server: PACKAGE_METADATA.serverSdkVersion,
  client_test: PACKAGE_METADATA.clientSdkVersion,
  core: PACKAGE_METADATA.coreSdkVersion,
} as const;
import { PACKAGE_METADATA } from "./generatedPackageMetadata.js";
