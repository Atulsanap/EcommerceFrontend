import { Component, OnInit,TemplateRef,ViewChild } from '@angular/core';
import { BootstrapOptions } from '@angular/core/src/application_ref';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../dataservice.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  registerForm: FormGroup;
  alldata : any[] =  [];
  submitted :boolean =false;
  customer : any [] = [];
  @ViewChild("modalContent") formModal: TemplateRef<any>;
  message: any;
  Issuccess: boolean = false;
  Isupdated: boolean= false; 
  Isdeleted :boolean = false;

  constructor(private formBuilder: FormBuilder,
    private dataservice : DataService,
    private modal: NgbModal) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      Name: ["", [Validators.required, Validators.pattern('^[a-zA-z]+([\\s][a-zA-Z_\\s-]+)*$')]],
      Price: ["", [Validators.required,Validators.pattern('')]],
      Discription: ["", [Validators.required,Validators.pattern('^[a-zA-z]+([\\s][a-zA-Z_\\s-]+)*$')]] 
    });

// this.alldata =   [{'id':1 , 'name': 'one' ,'discription':'dgf', 'price':532},
// {'id':2 , 'name': 'one' ,'discription':'dgf','price':354},
// {'id':3 , 'name': 'one' ,'discription':'dgf','price':645}]
    this.GetAll();
    debugger
     this.modal.open(this.formModal);
  }

  get f() { return this.registerForm.controls; }

  get g() { return this.registerForm.controls; }

  Submit(){debugger
    this.submitted =true;
    if(this.registerForm.valid){
    let data = this.registerForm.getRawValue();
      let CustomerModel = {
        Name: data.Name,
        Price : data.Price,
        Discription : data.Discription,
        ProcessType : 'Insert'
      };

    this.dataservice
    .add<any>("home/save", CustomerModel)
    .subscribe(
      (data: any) => {debugger
       this.message = data[0];
       if(this.message =='Success'){
         this.Issuccess =true;
       }
  });
}
}


Edit(data){debugger
  this.customer = this.alldata.filter(x =>x.id == data.id);
  this.modal.open(this.formModal, {
    size: "lg",
    backdrop: "static",
    keyboard: false,
  });

  if(this.customer){
     this.registerForm.controls["Name"].setValue(this.customer[0].Name);
     this.registerForm.controls["Discription"].setValue(this.customer[0].Discription);
     this.registerForm.controls["Price"].setValue(this.customer[0].Price);
  }

}

Update(){
  let data = this.customer;
  let CustomerModel = {
    Id : data[0].id,
    Name: data[0].Name,
    Price : data[0].Price,
    Discription : data[0].Discription,
    ProcessType : 'Edit'
  };
  
  this.dataservice
      .add<any>("home/update", CustomerModel)
      .subscribe(
        (data: any) => {
          this.message = data[0];
          this.alldata = data[1];
          if(this.message =="Updated")
          this.Isupdated =true;
          
               
    });
}

GetAll(){debugger
  let CustomerModel = {
    ProcessType : 'Getall'
  };
  this.dataservice.add<any>("home/getall",CustomerModel).subscribe((data:any)=>{
    var data = data[0];
    this.alldata = data;

  });
}


Delete(event){debugger
 let ID = event.id;

var data = 
  this.dataservice.delete<any>("home/delete",ID).subscribe((data:any)=>{
    var data = data[0];
    this.alldata = data;
    if(this.message =="Deleted")
          this.Isdeleted = true;
  });
}

openPopup(id) {
  // this.customer=this.alldata.filter(x =>x.id == id);
    this.modal.open(this.formModal, {
      size: "lg",
      backdrop: "static",
      keyboard: false,
    });
  }


}
