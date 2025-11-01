export type BaseModel = {
  Id?: number
  Uid?: string
  Ctime?: string
  Mtime?: string
}

export type Project = BaseModel & {
  Name?: string
  Description?: string
  CreatorUid?: string
  Creator?: User
  Owners?: User[]
  Users?: User[]
}

export type Requirement = BaseModel & {
  Title?: string
  Content?: string
  Priority?: number
  Status?: string
  ProjectUid?: string
  CreatorUid?: string
  CategoryUid?: string
  PmUid?: string
  DeveloperUid?: string
  TesterUid?: string
  Creator?: User
  Category?: RequirementCategory
  Tasks?: RequirementTask[]
}

export type RequirementCategory = BaseModel & {
  Name?: string
  ProjectUid?: string
}

export type RequirementTask = BaseModel & {
  Title?: string
  Type?: string
  Content?: string
  Status?: string
  WorkDays?: number
  RequirementUid?: string
  ReleaseUid?: string
  Executors?: User[]
}

export type App = BaseModel & {
  Name?: string
  Description?: string
  GitUrl?: string
  GitOwner?: string
  GitRepo?: string
  GitAccountUid?: string
  AppGroupUid?: string
  Group?: AppGroup
  Owners?: User[]
  Developers?: User[]
}

export type AppGroup = BaseModel & {
  Name?: string
  Description?: string
}

export type Env = BaseModel & {
  Name?: string
  Title?: string
  Description?: string
  KubeConfig?: string
  Domain?: string
  Color?: string
  Clusters?: Cluster[]
}

export type Cluster = BaseModel & {
  Name?: string
  Title?: string
  Description?: string
  KubeConfig?: string
}

export type GitAccount = BaseModel & {
  Host?: string
  Platform?: string
  Description?: string
  Token?: string
}


export type Image = BaseModel & {
  Name?: string
  Tag?: string
  Digest?: string
  Description?: string
  Status?: string
  ErrMsg?: string
  BuildTime?: number
  StartTime?: string
  EndTime?: string
  AppBranch?: string
  AppUid?: string
  ReleaseUid?: string
  CreatorUid?: string

}


export type Release = BaseModel & {
  Branch?: string
  Name?: string
  Status?: string
  ErrMsg?: string
  Description?: string
  ReplicaCount?: number
  AutoBuild?: boolean
  AutoDeploy?: boolean
  CreatorUid?: string
  EnvUid?: string
  ClusterUid?: string
  ClusterUids?: string[]
  AppUid?: string
  ImageUid?: string
  Creator?: User
  Image?: Image
  App?: App
  Env?: Env
  Cluster?: Cluster
}

export type Pod = BaseModel & {
  ClusterUid?: string
  ReleaseUid?: string
  Namespace?: string
  PodName?: string
  HostIp?: string
  PodIp?: string
  StartTime?: string
  Phase?: string
  Raw?: string
}

export type User = BaseModel & {
  Username?: string
  Phone?: string
  Email?: string
  Nickname?: string
  Password?: string
}

export type AppUser = User & {
  AppUid?: string
  Role?: string
}

