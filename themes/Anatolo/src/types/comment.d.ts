interface ValineConfig {
  enable: boolean;
  notify?: boolean;
  verify?: boolean;
  appid: string;
  appkey: string;
  placeholder: string;
  serverURLs: string[];
  visitor: boolean;
  recordIP: boolean;
  avatar: string;
}

interface GitalkConfig {
  enable: boolean;
  owner: string;
  repo: string;
  client_id: string;
  client_secret: string;
  id: string;
}

export interface CommentConfig {
  valine?: ValineConfig;
  gitalk?: GitalkConfig;
  disqus?: string;
}
