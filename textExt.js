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

      "id": "textExportConfig",
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

      }]

    }

  }

  exportTxtFile({string, name}){

    //Script by Kamil Kiełczewski

    let a = document.createElement('a');
    a.href = "data:application/octet-stream,"+encodeURIComponent(string);
    a.download = name + '.txt';
    a.click();

  }

}

(function() {
    var extensionInstance = new ScratchFileManager(window.vm.extensionManager.runtime)
    var serviceName = window.vm.extensionManager._registerInternalExtension(extensionInstance)
    window.vm.extensionManager._loadedExtensions.set(extensionInstance.getInfo().id, serviceName)
})()
