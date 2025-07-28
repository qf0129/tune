
export type App = {
  Id?: number
  Ctime?: string
  Mtime?: string
  Uid?: string
  Name?: string
  Description?: string
  GitUrl?: string
  GitOwner?: string
  GitRepo?: string
  GitAccountUid?: string
  AppGroupUid?: string
}

export type Env = {
  Id?: number
  Ctime?: string
  Mtime?: string
  Uid?: string
  Name?: string
  Title?: string
  Description?: string
  KubeConfig?: string
  Domain?: string
}

export type GitAccount = {
  Id?: number
  Ctime?: string
  Mtime?: string
  Uid?: string
  Host?: string
  Platform?: string
  Description?: string
  Token?: string
}


export type Image = {
  Id?: number
  Ctime?: string
  Mtime?: string
  Uid?: string
  Name?: string
  Tag?: string
  Digest?: string
  Description?: string
  Status?: string
  ErrMsg?: string
  BuildTime?: number
  AppBranch?: string
  AppUid?: string
  CreatorUid?: string
}


export type Release = {
  Id?: number
  Ctime?: string
  Mtime?: string
  Uid?: string
  Name?: string
  Status?: string
  ErrMsg?: string
  Description?: string
  ReplicaCount?: number
  CreatorUid?: string
  EnvUid?: string
  AppUid?: string
  ImageUid?: string
}


export type User = {
  Id?: number
  Ctime?: string
  Mtime?: string
  Uid?: string
  Username?: string
  Phone?: string
  Email?: string
  Nickname?: string
  Password?: string
}