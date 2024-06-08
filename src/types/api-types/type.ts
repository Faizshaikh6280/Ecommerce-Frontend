export type MessageResponse = {
  status : string,
  message :string,
  error ?: Object,
  stack ?:string
}