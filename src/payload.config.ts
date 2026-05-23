import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Education } from "./collections/Education";
import { Experience } from "./collections/Experience";
import { Media } from "./collections/Media";
import { Portfolio } from "./collections/Portfolio";
import { Services } from "./collections/Services";
import { Skills } from "./collections/Skills";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";

import { About } from "./globals/About";
import { Contact } from "./globals/Contact";
import { Hero } from "./globals/Hero";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " — ImranX Admin",
    },
  },
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL,
  collections: [
    Users,
    Media,
    Services,
    Portfolio,
    Experience,
    Education,
    Skills,
    Testimonials,
  ],
  globals: [Hero, About, Contact, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "DEV_SECRET_CHANGE_ME",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // Auto-enable Vercel Blob storage for the Media collection when
    // BLOB_READ_WRITE_TOKEN is present (set automatically by Vercel when
    // you add the Blob integration to your project). In local dev with no
    // token set, falls back to local disk uploads.
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
