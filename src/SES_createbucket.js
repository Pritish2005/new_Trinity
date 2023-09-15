const AWS=require("aws-sdk")

const s3 = new AWS.S3({
  //   apiVersion: '2010-12-01',
      accessKeyId: 'AKIA3YLI37VDOG3VMPBK',
      secretAccessKey: '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',
      region: "us-east-1",
    });

s3.createBucket({
  Bucket: 'trinitybucket002'
},(error,success)=> {
  if (error) {
    console.log("Error", error);
    } else {
    console.log("Success", success);
    }
})

// s3.putObject({
//   body: "NSUT.txt",
//   Bucket: "trinitybucket001",
//   Key: "ABCNSUT",
// })