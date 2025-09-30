import type { App, Env, GitAccount, Image, Pod, Release, User } from "@/util/type";
import request, { type PageObject, type Response } from "./request";

export type ReqAuth = {
  Username: string;
  Password: string;
}

export type ReqPage<T> = {
  Page?: number
  PageSize?: number
  Model?: T
  OrderBy?: string
}

type ReqReleaseDeploy = {
  ReleaseUid?: string
  ConfigMode?: string
  ConfigMountP?: string
  Container?: any
  ServiceSpec?: any
}

type ReqQueryPodLog = {
  PodUid?: string
  SinceSeconds?: number
  TailLines?: number
}

export default {
  SignIn: (data: ReqAuth): Promise<Response<{ Token: string }>> => request.post('/api/SignIn', data),
  SignUp: (data: ReqAuth): Promise<Response<{ Uid: string }>> => request.post('/api/SignUp', data),
  SignOut: (): Promise<Response<boolean>> => request.post('/api/SignOut'),
  QueryGitAccount: (data: ReqPage<GitAccount>): Promise<Response<PageObject<GitAccount>>> => request.post('/api/QueryGitAccount', data),
  CreateGitAccount: (data: GitAccount): Promise<Response<GitAccount>> => request.post('/api/CreateGitAccount', data),
  DeleteGitAccount: (data: GitAccount): Promise<Response<GitAccount>> => request.post('/api/DeleteGitAccount', data),
  UpdateGitAccount: (data: GitAccount): Promise<Response<GitAccount>> => request.post('/api/UpdateGitAccount', data),
  QueryApp: (data: ReqPage<App>): Promise<Response<PageObject<App>>> => request.post('/api/QueryApp', data),
  CreateApp: (data: App): Promise<Response<App>> => request.post('/api/CreateApp', data),
  DeleteApp: (data: App): Promise<Response<App>> => request.post('/api/DeleteApp', data),
  UpdateApp: (data: App): Promise<Response<App>> => request.post('/api/UpdateApp', data),
  // QueryAppUser: (data: ReqQueryAppUser): Promise<Response<User[]>> => request.post('/api/QueryAppUser', data),
  // DeleteAppUser: (data: ReqQueryAppUser): Promise<Response<ReqQueryAppUser>> => request.post('/api/DeleteAppUser', data),
  QueryEnv: (data: ReqPage<Env>): Promise<Response<PageObject<Env>>> => request.post('/api/QueryEnv', data),
  CreateEnv: (data: Env): Promise<Response<Env>> => request.post('/api/CreateEnv', data),
  DeleteEnv: (data: Env): Promise<Response<Env>> => request.post('/api/DeleteEnv', data),
  UpdateEnv: (data: Env): Promise<Response<Env>> => request.post('/api/UpdateEnv', data),
  QueryImage: (data: ReqPage<Image>): Promise<Response<PageObject<Image>>> => request.post('/api/QueryImage', data),
  CreateImage: (data: Image): Promise<Response<Image>> => request.post('/api/CreateImage', data),
  DeleteImage: (data: Image): Promise<Response<Image>> => request.post('/api/DeleteImage', data),
  UpdateImage: (data: Image): Promise<Response<Image>> => request.post('/api/UpdateImage', data),
  QueryRelease: (data: ReqPage<Release>): Promise<Response<PageObject<Release>>> => request.post('/api/QueryRelease', data),
  CreateRelease: (data: Release): Promise<Response<Release>> => request.post('/api/CreateRelease', data),
  DeleteRelease: (data: Release): Promise<Response<Release>> => request.post('/api/DeleteRelease', data),
  UpdateRelease: (data: Release): Promise<Response<Release>> => request.post('/api/UpdateRelease', data),
  ReleaseBuild: (ReleaseUid: string): Promise<Response<Image>> => request.post('/api/ReleaseBuild', { ReleaseUid }),
  ReleaseDeploy: (data: ReqReleaseDeploy): Promise<Response<boolean>> => request.post('/api/ReleaseDeploy', data),
  ReleaseOffline: (ReleaseUid: string): Promise<Response<boolean>> => request.post('/api/ReleaseOffline', { ReleaseUid }),
  QueryPod: (data: ReqPage<Pod>): Promise<Response<PageObject<Pod>>> => request.post('/api/QueryPod', data),
  QueryPodLog: (data: ReqQueryPodLog): Promise<Response<string>> => request.post('/api/QueryPodLog', data),
  QueryUser: (data: ReqPage<User>): Promise<Response<PageObject<User>>> => request.post('/api/QueryUser', data),
  CreateUser: (data: User): Promise<Response<User>> => request.post('/api/CreateUser', data),
  DeleteUser: (data: User): Promise<Response<User>> => request.post('/api/DeleteUser', data),
  UpdateUser: (data: User): Promise<Response<User>> => request.post('/api/UpdateUser', data),
}