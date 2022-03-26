import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http-service.mock.service'; 

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  fileName: string| null = null;
  uploadProgress: number|null = null;
  uploadSub: Subscription|null = null;
  options: FormGroup;
  isPrivateControl = new FormControl(false);
  videoTitleControl = new FormControl('', [Validators.required]);

  constructor(
    private http: HttpService,
    fb: FormBuilder) {
      this.options = fb.group({
        videoTitle : this.videoTitleControl,
        isPrivate: this.isPrivateControl,
      });
    }

  ngOnInit(): void {
  }

 
  onFileSelected(event: any) {
    console.log("upload called");
    const file:File = event.target.files[0];
    if (file) {
      // this.videoTitleControl.setValue(file.name);
      this.fileName = file.name;
      console.log(this.fileName)
      const formData = new FormData();
      formData.append("file", file);
      this.uploadSub = this.http.uploadFile(event)
      .pipe(
        // finalize(() => this.reset())
      ).subscribe(event => {     
        console.log(event); 
        this.uploadProgress = 20;
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      })
    }        
  }

  cancelUpload() {
    if(this.uploadSub){
      this.uploadSub.unsubscribe();
    }
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.fileName = null;
  }

  getErrorMessage() : string { 
    return this.videoTitleControl.hasError('required') ? 'You must enter a value' : '';
  }
}
