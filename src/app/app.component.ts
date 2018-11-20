import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./index.scss', './modals.scss']
})
export class AppComponent {
  @ViewChild('scrollBug') private cScrollBug: ElementRef;
  @ViewChild('scrollScenario') private cScrollScenario: ElementRef;
  title = 'Wire-Report';
  modal = 0;
  currentReport;
  currentScenario;
  videoCalls = {
    title: 'Video Calls',
    // tslint:disable-next-line:max-line-length
    description: 'This bug is prompted by the video call function not checking if the app has the correct permits, resulting in a missbelief that the application does not works (because the UI will show little to 0 change), and another user receiving a call which has no video',
    steps: [
      // tslint:disable-next-line:max-line-length
      'Download and install Wire app', 'Open a conversation with a contact (image 1)', 'Choose video call option (image 2)', 'If the application asks for video permissions deny them', 'Tell your contact to answer the call (image 3)', 'The videocall and voicecall buttons will dissapear (image 4) and if the phone is locked it will show a call in progress (image 5)'
    ],
    // tslint:disable-next-line:max-line-length
    solution: 'As we can see in the code (image 6) this behaivour is expected by the Wire developers (specifcally in the commented line 75, "We still allow starting the call, even if the video permissions were not granted"),this is because for the application a video call and a voice call are not different, they are both handle by the class "ZMConversation+Calling.swift" and the same function which only needs micrphone permits to start a call. Althought this is good because it does not block any application functionality, we aregue that the UI does not refresh correctly giving missleading information to the user',
    // tslint:disable-next-line:max-line-length
    images: ['../assets/Conversation.jpeg', '../assets/Conversation-RedCircle.jpg', '../assets/Video-Call-Desktop.png', '../assets/Video-Call-iPhone.jpg', '../assets/Call-In-Progress.PNG', '../assets/VideoCall-Solution.jpg']
  };
  badMessage = {
    title: 'Bad Message',
    // tslint:disable-next-line:max-line-length
    description: 'The max. number of characters its a dynamic value which is not define within the app resulting in the placeholder of the variable being shown',
    steps: [
      // tslint:disable-next-line:max-line-length
      'Download and install Wire app', 'Open a conversation with a contact (image 1)', 'Write more than 8000 characters (image 2)', 'Send the message (image 3)',
    ],
    // tslint:disable-next-line:max-line-length
    solution: 'The function "showAlertIfTextIsTooLong" (image 4) demostrates that the message shown in the UI is static (image 5) which happens in all language files (image 6), the solution was to search the value in the environment variable and then changed it in the corresponding string (image 7 & 8)',
    // tslint:disable-next-line:max-line-length
    images: ['../assets/Conversation.jpeg', '../assets/300C.jpeg', '../assets/Message-Long.PNG', '../assets/BadMessage-Method.png', '../assets/BadMessage-String.png', '../assets/BadMessge-Files.png', '../assets/BadMessage-Solution-1.png', '../assets/BadMessage-Solution-2.jpeg']
  };
  keyboard = {
    title: 'Keyboard on top od Video Call',
    // tslint:disable-next-line:max-line-length
    description: 'The view controller does not dismiss the first responder (which in this case is the keyboard), making the keyboard appear in top of the video call',
    steps: [
      // tslint:disable-next-line:max-line-length
      'Download and install Wire app', 'Open a conversation with a contact (image 1)', 'Tap on the text field message (image 2)', 'Start a video call (image 3)', 'Drag from left to right, making the keyboard appear (image 4)'
    ],
    // tslint:disable-next-line:max-line-length
    solution: 'The video call its handle by a view (not a view controller) which appears in top of the chat view controller (image 5), because the keyboard (which is a first responder) is not dismissed when the video call starts its input field is still available during the call, the keyboard is not triggered because the video call buttons block the interactions (image 6), but the input can be interacted with, so when this happens the input calls the keyboard. The solution would be to dismiss the first responder when opening the video call view',
    // tslint:disable-next-line:max-line-length
    images: ['../assets/Conversation.jpeg', '../assets/iPgone-Chat.png', '../assets/Conversation-RedCircle.jpg', '../assets/Keyboard.PNG', '../assets/Keyboard-Layers.png', '../assets/Keyboard-Buttons.jpeg']
  };
  eventualConnection = {
    title: 'Video Call Eventual Connection',
    // tslint:disable-next-line:max-line-length
    description: 'The provider of the video call service does not try to recover or handle calls after losing internet connection, in addition to this, the user on the other end is shown a call on pause when in reality the call already ended',
    steps: [
      // tslint:disable-next-line:max-line-length
      'Download and install Wire app', 'Open a conversation with a contact (image 1)', 'Start a video call (image 2)', 'Turn airplane mode and wait 5 seconds (image 3)', 'Turn off airplane mode'
    ],
    // tslint:disable-next-line:max-line-length
    solution: 'First of all, all this analysis is made from assumptions because the eventual connection is handled by the library that Wire uses for video calling thus we can not access the code. With that in mind, we think that the service after establishing the call does not saves a reference of the video call, which then results in losing the reference when the internet connection is lost',
    // tslint:disable-next-line:max-line-length
    images: ['../assets/Conversation.jpeg', '../assets/Conversation-RedCircle.jpg', '../assets/eventualConnection-airplane.PNG']
  };
  CPU = {
    title: 'CPU Quality Scenarios',
    description: 'We tested the application enduring various scenarios to observe the CPU consumption',
    steps: [
      {
        video: 'assets/Videos/CPU-images-10.mov',
        title: 'Image messaging CPU Consumption',
        // tslint:disable-next-line:max-line-length
        description: 'A conversation was hold between two iPhone X sending a 10mb image every second. The application crashed because the image could not be loaded in time when the function "setUpImageView" was called, leading into a null value for the image'
      },
      {
        video: 'assets/Videos/CPUMessaging.mov',
        title: 'Text Messaging CPU Consumption',
        description: 'A conversation was hold between two iPhone X sending a text message every second with no more thna 5 characters'
      },
      {
        video: 'assets/Videos/CPU-longtext-messages.mov',
        title: 'Long Text Messaging CPU Consumption',
        description: 'A conversation was hold between two iPhone X sending a text message every second with  600 characters'
      },
      {
        video: 'assets/Videos/CPU-Stroke-messages.mov',
        title: 'Stroke Messaging CPU Consumption',
        // tslint:disable-next-line:max-line-length
        description: 'A conversation was hold between two iPhone X sending a text message every 2 seconds with strokes painted through the app'
      },
      {
        video: 'assets/Videos/CPUVoicecall.mov',
        title: 'Voice Call CPU Consumption',
        description: 'A voice call was hold between two iPhone X speaking a word every 2 seconds'
      },
      {
        video: 'assets/Videos/CPUVideocall.mov',
        title: 'Video Call CPU Consumption',
        description: 'A video call was hold between two iPhone X moving the camera around, thus changing the image shown'
      }
    ],
    // tslint:disable-next-line:max-line-length
    result: 'We can observe a higher CPU consumption consequence of bigger processes, in addition to this, the application crashed because of a misshandle of a null'
  };
  network = {
    title: 'Network Quality Scenarios',
    description: 'We tested the application enduring various scenarios to observe the Network consumption',
    steps: [
      {
        video: 'assets/Videos/NETWORK-pixels.mov',
        title: 'Video Call Network Consumption',
        // tslint:disable-next-line:max-line-length
        description: 'A video call was hold between two iPhone X covering the camera, thus the video was completly black, a lower consumption can be observe vs. when the camera moves around a lot. This scenario shows both interactions'
      },
      {
        video: 'assets/Videos/NetworkMessaging.mov',
        title: 'Image messaging Network Consumption',
        // tslint:disable-next-line:max-line-length
        description: 'A conversation was hold between two iPhone X sending a text message every second with no more thna 5 characters'
      },
      {
        video: 'assets/Videos/NetowrkVoicecall.mov',
        title: 'Voice Call Network Consumption',
        description: 'A voice call was hold between two iPhone X speaking a word every 2 seconds'
      },
      {
        video: 'assets/Videos/NetworkVideocall.mov',
        title: 'Video Call Network Consumption',
        description: 'A video call was hold between two iPhone X moving the camera around, thus changing the image shown'
      }
    ],
    // tslint:disable-next-line:max-line-length
    result: 'We can observe a higher Network consumption consequence of bigger processes, in addition to this, the application handles well when the video does not has new pixels to show, this means that the algorthim of the video call pre process the image to see if it has pixels that are not "new" so it does not send them again, saving network in the process'
  };
  memory = {
    title: 'Memory Quality Scenarios',
    description: 'We tested the application enduring various scenarios to observe the Memory consumption',
    steps: [
      {
        video: 'assets/Videos/MemoryMessaging.mov',
        title: 'Image messaging Network Consumption',
        // tslint:disable-next-line:max-line-length
        description: 'A conversation was hold between two iPhone X sending a text message every second with no more thna 5 characters'
      },
      {
        video: 'assets/Videos/MemoryVoicecall.mov',
        title: 'Voice Call Network Consumption',
        description: 'A voice call was hold between two iPhone X speaking a word every 2 seconds'
      },
      {
        video: 'assets/Videos/MemoryVideocall.mov',
        title: 'Video Call Network Consumption',
        description: 'A video call was hold between two iPhone X moving the camera around, thus changing the image shown'
      }
    ],
    // tslint:disable-next-line:max-line-length
    result: 'We can observe a higher Memory consumption consequence of bigger processes, although, the increment is less than the expected when analysing the memory consumed by text messaging and video calling, probably due to the optimization of the services that provide these functionalities'
  };
  energy = {
    title: 'Energy Quality Scenarios',
    description: 'We tested the application enduring various scenarios to observe the Energy consumption',
    steps: [
      {
        video: 'assets/Videos/EnergyMessaging.mov',
        title: 'Image messaging Network Consumption',
        // tslint:disable-next-line:max-line-length
        description: 'A conversation was hold between two iPhone X sending a text message every second with no more thna 5 characters'
      },
      {
        video: 'assets/Videos/EnergyVoicecall.mov',
        title: 'Voice Call Network Consumption',
        description: 'A voice call was hold between two iPhone X speaking a word every 2 seconds'
      },
      {
        video: 'assets/Videos/EnergyVideocall.mov',
        title: 'Video Call Network Consumption',
        description: 'A video call was hold between two iPhone X moving the camera around, thus changing the image shown'
      }
    ],
    // tslint:disable-next-line:max-line-length
    result: 'We can observe a higher Energy consumption consequence of bigger processes, a big factor in the raise of the energy consumption is the use of the sensors (microphone and camera in this cases) which represents the biggest part of the energy consumption'
  };
  constructor() {
    this.modal = 2;
    this.currentScenario = this.energy;
  }
  openModalBug(a) {
    this.currentReport = a;
    this.cScrollBug.nativeElement.scroll(0, 0);
    this.modal = 1;
  }
  openModalScenario(a) {
    this.currentScenario = a;
    this.cScrollScenario.nativeElement.scroll(0, 0);
    this.modal = 2;
  }
  closeModals() {
    this.modal = 0;
  }
  openImg(url) {
    window.open(url, '_blank');
  }
  scroll(el) {
    el.scrollIntoView();
  }
}
