var Split = require('split.js').default;
var physiomeportal = require('physiomeportal');

Main = function()  {
	var moduleManager = undefined;
	var UIIsReady = true;
	var managerSidebar = undefined;
	var _this = this;

	/**
	 * Initialise all the panels required for PJP to function correctly.
	 * Modules used incude - {@link PJP.ModelsLoader}, {@link PJP.BodyViewer},
	 * {@link PJP.OrgansViewer}, {@link PJP.TissueViewer}, {@link PJP.CellPanel}
	 * and {@link PJP.ModelPanel}.
	 */
	var initialiseMain = function() {
		if (moduleManager.isReady()) {
			Split(['#one', '#two'], {
				elementStyle: (dimension, size, gutterSize) => ({
					'flex-basis': `calc(${size}% - ${gutterSize}px)`,
				}),
				gutterStyle: (dimension, gutterSize) => ({
					"border-style": "solid"
				}),
			})
			Split(['#three', '#four'], {
				direction: 'vertical',
				elementStyle: (dimension, size, gutterSize) => ({
					'flex-basis': `calc(${size}% - ${gutterSize}px)`,
				}),
				gutterStyle: (dimension, gutterSize) => ({
					"cursor": 'row-resize',
					"border-style": "solid"
				}),
			})
			var one = document.getElementById("one");
			var three = document.getElementById("three");
			moduleManager.allowStateChange = true;
			UIIsReady = true;
			if (window.location.hash == "") {
				//parent = document.body;
				var bodyViewer = moduleManager.createModule("Body Viewer");
				var organsViewer = moduleManager.createModule("Organs Viewer");
				organsViewer.setName("Organs Viewer");
				var organsViewerDialog = new physiomeportal.OrgansViewerDialog(organsViewer, one);
				organsViewerDialog.hideCloseButton();
				bodyViewer.setName("Body Viewer");
				bodyViewer.readSystemMeta();
				bodyViewerDialog = new physiomeportal.BodyViewerDialog(bodyViewer, three);
				bodyViewerDialog.hideCloseButton();
				bodyViewerDialog.destroyModuleOnClose = true;
				bodyViewerDialog.dock();
				organsViewerDialog.destroyModuleOnClose = true;
				organsViewerDialog.dock();
				organsViewer.loadOrgans("rat", "Digestive", "Stomach");
				moduleManager.manageDialog(bodyViewerDialog);
				moduleManager.manageDialog(organsViewerDialog);
				window.organsViewerDialog = organsViewerDialog;
				window.bodyViewerDialog = bodyViewerDialog;
			} else {
				moduleManager.deserialise(window.location.hash);
			}
			moduleManager.enableHashChangedEvent();
		} else {
		setTimeout(function(){initialiseMain()}, 1000);
	}
	/*

      var test = document.getElementById("mytest");
      moduleManager.allowStateChange = true;
      moduleManager.manageDialog(organsViewerDialog);
      managerSidebar = new physiomeportal.ManagerSidebar(test);
      managerSidebar.addManager(moduleManager);
      managerSidebar.open();
      managerSidebar.setWidth("12%");
      moduleManager.initialiseGridView(test);
      moduleManager.enableGridView();
      UIIsReady = true;
      if (window.location.hash == "") {
          //parent = document.body;
          var bodyViewer = moduleManager.createModule("Body Viewer");
          var organsViewer = moduleManager.createModule("Organs Viewer");
          organsViewer.setName("Organs Viewer");
          var organsViewerDialog = new physiomeportal.OrgansViewerDialog(organsViewer, test);
          bodyViewer.setName("Body Viewer");
          bodyViewer.readSystemMeta();
          bodyViewerDialog = new physiomeportal.BodyViewerDialog(bodyViewer, test);
          bodyViewerDialog.hideCloseButton();
          bodyViewerDialog.destroyModuleOnClose = true;
          organsViewerDialog.destroyModuleOnClose = true;
          organsViewer.loadOrgans("rat", "Digestive", "Stomach");
          moduleManager.manageDialog(bodyViewerDialog);
          moduleManager.manageDialog(organsViewerDialog);
      } else {
    	  moduleManager.deserialise(window.location.hash);
      }
      moduleManager.enableHashChangedEvent();
    } else {
      setTimeout(function(){initialiseMain()}, 1000);
    }
    */
  }
    
  var initialise = function() {
    moduleManager = new physiomeportal.ModuleManager();
    initialiseMain();
  }

  initialise();
}

window.document.addEventListener('DOMContentLoaded', Main);