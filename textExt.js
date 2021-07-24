// MIT license

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const TargetType = require('../../extension-support/target-type');

const formatMessage = require('format-message');

class ScratchFileManager {

  constructor(runtime){

    this.runtime = runtime;

  }

  getInfo(){

    return {

      id: "txtFileConfig",
      blocks: [{
          opcode: "exportTxtFile",
          blockType: 'command',
          text: formatMessage({
            id: "exportFile",
            defaultMessage: 'export [STRING] with [NAME]',
            description: 'Label for "exportFile" block'
          }),
          arguements: {

            STRING: {

              type: ArgumentType.STRING,
              default: 'Hello World!'

            },

            NAME: {

              type: ArgumentType.STRING,
              default: formatMessage({
                id: "exportFile.NAME_default",
                defaultMessage: 'meow',
                description: 'Default for "NAME" arg for "exportTxtFile"'
              }),

            }

          }

      }]

    }

  }

  exportTxtFile(string, name){

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
