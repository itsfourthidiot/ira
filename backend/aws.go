package main

import (
	"context"

	"github.com/aws/aws-sdk-go-v2/feature/s3/manager"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func uploadFile(c context.Context, input *s3.PutObjectInput) (*manager.UploadOutput, error) {
	uploader := manager.NewUploader(client)
	return uploader.Upload(context.TODO(), input)
}
