import { Component, OnInit, Input } from '@angular/core';
import { SetupService } from 'src/app/modules/setup.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {

  @Input() label: String;
  @Input() switchText: String;
  @Input() toggleState: Boolean;
  @Input() controllerID: String;
  @Input() keyID: Number;

  constructor(private Setup: SetupService) { }

  ngOnInit() {
    
  }
  changeState(value, controllerID, key) {
    //console.log(e.checked + " " + pID + " " + kID );
    
    this.Setup.setControllerState(controllerID,key,value.checked);
  }

}
