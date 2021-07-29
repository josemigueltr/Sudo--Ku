# aws
import boto3

def upload_file(file, acl="public-read"):
  s3 = boto3.client('s3')
  s3.upload_fileobj(
    file, 
    'ebarrotes', 
    'assets/{}'.format(file.filename),
    ExtraArgs={
      "ACL": acl,
      "ContentType": file.content_type
    }
  )
  return "https://ebarrotes.s3.us-west-1.amazonaws.com/assets/{}".format(file.filename)