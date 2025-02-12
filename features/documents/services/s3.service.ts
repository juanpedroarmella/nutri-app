import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export class S3Service {
  private static instance: S3Service
  private _client: S3Client
  private bucket: string

  private constructor() {
    this._client = new S3Client({
      region: process.env.AWS_REGION!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    })
    this.bucket = process.env.AWS_S3_BUCKET!
  }

  public static getInstance(): S3Service {
    if (!S3Service.instance) {
      S3Service.instance = new S3Service()
    }
    return S3Service.instance
  }

  get client() {
    return this._client
  }

  async uploadFile(file: Buffer, key: string, contentType: string): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: file,
      ContentType: contentType
    })

    await this.client.send(command)
    return key
  }

  async deleteFile(key: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key
    })

    await this.client.send(command)
  }

  async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: key
    })

    return await getSignedUrl(this.client, command, { expiresIn: 3600 })
  }
}

export const s3Service = S3Service.getInstance() 