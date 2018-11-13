				var ToolTip = function() {
				  var tooltipcontainerElement = undefined;
				  var tipElement = undefined;
				  var tiptextElement = undefined;
				  var _this = this;
				  
				  /**
				   * Show tool tip on the specified windows coordinates.
				   * @param {Number} x - Style sheet with the same title.
				   * @param {Number} y - selector string to match.
				   */
				  this.show = function(x, y) {
				    tooltipcontainerElement.style.left = x +"px";
				    tooltipcontainerElement.style.top = (y - 20) + "px";
				    tipElement.style.visibility = "visible";
				    tipElement.style.opacity = 1;
				    tiptextElement.style.visibility = "visible";
				    tiptextElement.style.opacity = 1;
				  }
				  
				  this.hide = function() {
				    tipElement.style.visibility = "hidden";
				    tipElement.style.opacity = 0;
				    tiptextElement.style.visibility = "hidden";
				    tiptextElement.style.opacity = 0;
				  }
				  
				  /**
				   * Change the tooltip text.
				   * @param {String} text - Text to update the tooltip to.
				   */
				  this.setText = function(text) {
				    tiptextElement.innerHTML = text;
				  }
		
				  var setupToolTipContainer = function() {
				    /*
				    for (i = 0; i < childNodes.length; i++) {
				      parent[0].appendChild(childNodes[i]);
				    }
				    */
				    tooltipcontainerElement = document.getElementById("tooltipcontainer");
				    tipElement = document.getElementById("tip");
				    tiptextElement = document.getElementById("tiptext");
				  }
				  
				  setupToolTipContainer();
				}
		
		
				var FolderControls = function() {
				  this.testBoolean = true;
				  this.testBoolean2 = false;
				  this.tryAgain = false;
				};
						
				var gui = undefined;
		    var guiControls = new function() {
		      this['Type'] = "case1";
				};
				var types = ["case1", "case2", "case3"];
				var controls = new FolderControls();
		
        gui = new dat.GUI({autoPlace: false, width: 350});
        gui.domElement.id = 'gui';
        gui.close();
        var customContainer = document.getElementById("testDatGui").append(gui.domElement);
        var viewAllButton = { 'View All':function(){ viewAll() }};
        var resetButton = { 'Reset':function(){ resetView() }};
        var readButton = { 'Read':function(){ readWorkspacePrompt() }};
        var commitButton = {'Commit':function() { commitWorkspace() }};
        var pushButton = {'Push':function() { pushWorkspace() }};
        var writeButton = { 'Write':function(){ write() }};
        gui.add(viewAllButton, 'View All');
        gui.add(resetButton, 'Reset');
        gui.add(readButton, 'Read');
        gui.add(commitButton, 'Commit');
        gui.add(pushButton, 'Push');
        gui.add(guiControls, 'Type', types ).onChange(function(value) {
          changeMeshTypesControl();
  			});
  			
  		  var addSystemFolders = function() {
  		    var temp = gui.addFolder("A folder");
					temp.add(controls, 'testBoolean');
					temp.add(controls, 'testBoolean2');
					temp.add(controls, 'tryAgain');
  		  }
  		  
  	    var toolTip = new ToolTip();
        toolTip.setText("This is a test");
        toolTip.show(300, 300);
  		  addSystemFolders();
