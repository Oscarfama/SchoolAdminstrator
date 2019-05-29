import { Component, OnInit } from '@angular/core';
import {ChatService} from "../chat.service";
import {ActivatedRoute} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  chat$: Observable<any>;
  newMsg: string;

  constructor(public cs:ChatService, private route: ActivatedRoute) { }

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get(chatId);
    this.chat$ = this.cs.joinUsers(source);
  }

  submit(chatId){
    if(!this.newMsg){
      return alert('you need to enter something');
    }
    this.cs.sendMessage(chatId,this.newMsg);
    this.newMsg= '';
  }
  trackByCreated(i,msg){
    return msg.createdAt;
  }

}
