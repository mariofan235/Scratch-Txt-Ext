// MIT license

// const ArgumentType = require('../../extension-support/argument-type');
// const BlockType = require('../../extension-support/block-type');
// const TargetType = require('../../extension-support/target-type');
//
// const formatMessage = require('format-message');

class ScratchFileManager {

  constructor(runtime){

    this.runtime = runtime;

  }

  getInfo(){

    return {

      "id": "TxtFiles",
      "blocks": [{
          "opcode": "exportTxtFile",
          "blockType": 'command',
          "text": 'export text [STRING] with file name [NAME]',
          "arguements": {

            "STRING": {

              "type": "string",
              "defaultValue": 'Hello World!'

            },

            "NAME": {

              "type": "string",
              "defaultValue": 'meow',

            }

          }

      }, {

        "opcode": "importTxtFile",
        "blockType": 'command',
        "text": "import text file and wait"

      }]

    }

  }

  exportTxtFile(arg){

    //Script by Kamil Kiełczewski

    let a = document.createElement('a');
    a.href = "data:application/octet-stream,"+encodeURIComponent(arg.STRING);
    a.download = arg.NAME + '.txt';
    a.click();

  }

  importTxtFile(){

    var askBox = document.getElementById('question');
    console.log(askBox);
    var button = document.createElement("input");
    button.type = "file";
    document.header.appendChild(button);

  }

}

(function() {
    var extensionInstance = new ScratchFileManager(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()
