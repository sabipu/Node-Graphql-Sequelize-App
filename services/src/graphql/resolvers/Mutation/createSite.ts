import { Site } from "#root/db/models";

const createSiteResolver = (context: any, {userId, name, url, username, sitePassword, description}: {userId: string, name: string, url: string, username: string, sitePassword: string, description: string}) => {
  return Site.create({ userId, name, url, username, sitePassword, description });
}

export default createSiteResolver;