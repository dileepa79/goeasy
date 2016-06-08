import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'file-uploader',
    templateUrl: './app/fileuploader/file-uploader.component.html'
}) 

export class FileUploaderComponent {
    
   @Input() public filesToUpload: FileToUpload[];
  
    fileChangeEvent(event: any) {
        var files = event.srcElement.files;
        this.updateLocalObject(files);
        this.showFilePreview(files);
    }

    updateLocalObject(files: File[]) {
        for (var index = 0; index < files.length; index++) {
            var newFile = new FileToUpload();
           // newFile.id = index;
            newFile.file = files[index];
            this.filesToUpload.push(newFile);
        }
    }

    showFilePreview(files: File[]) {
        var reader = [];  // create empt array for readers
        for (var index = 0; index < files.length; index++) {
            reader.push(new FileReader());

            reader[index].addEventListener("load", (event) => {
                var matchingIndex = this.filesToUpload.findIndex(x=> x.file.name == files[0].name);
                var a = event.target.result;
                this.filesToUpload[matchingIndex].previwSrc = event.target.result;
            }, false);
            if (files[index]) {
                reader[index].readAsDataURL(files[index]);
            }
        }
    }

    removeFile(file) {
        debugger;
        var index = this.filesToUpload.findIndex(x=> x === file);
        this.filesToUpload.splice(index, 1);   
    }


}

export class FileToUpload {
   // id: number;
    file: File;
    previwSrc: string;
}