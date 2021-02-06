// adds select menu item 

function onOpen() {
  var ui = SlidesApp.getUi();
  ui.createMenu('Select')
  .addItem('Similar', 'selectSimilar')
  .addToUi();
}

function selectSimilar(){
  var selection = SlidesApp.getActivePresentation().getSelection();
  var slide = selection.getCurrentPage();
  var pageElements = slide.getPageElements();
  var selectionType = selection.getSelectionType();
  var currentPage;
  switch (selectionType) {
    case SlidesApp.SelectionType.NONE:
      Logger.log('Nothing selected');
      break;
    case SlidesApp.SelectionType.CURRENT_PAGE:
      currentPage = selection.getCurrentPage();
      Logger.log('Selection is a page with ID: ' + currentPage.getObjectId());
      break;
    case SlidesApp.SelectionType.PAGE_ELEMENT:
      var selectedElements = selection.getPageElementRange().getPageElements();
      Logger.log('There are ' + selectedElements.length + ' page elements selected.');
      var pageElementType = selectedElements[0].getPageElementType();
      Logger.log(pageElementType);
      if(pageElementType == "SHAPE") {
        var shapeTypes = [];
        for(var i=0; i<selectedElements.length; i++){
          shapeTypes[i] = selectedElements[i].asShape().getShapeType();
        }
        for(var i = 0; i < pageElements.length; i++) {
          for(var j=0;j<shapeTypes.length;j++) {
            try{
              if(shapeTypes[j] == pageElements[i].asShape().getShapeType()) { 
                pageElements[i].select(false);
              } 
            }
            catch(e) { 
              Logger.log(e.message);
            }
          }
        }
      }
      else if(pageElementType == "LINE") {
      // line stuff next
        Logger.log("line stuff");
        for(var i = 0; i < pageElements.length; i++) {
          try{
            if("LINE" == pageElements[i].getPageElementType()) { 
              pageElements[i].select(false);
            } 
          }
          catch(e) { 
            Logger.log(e.message);
          }
        }
      }
      var selectedElements = selection.getPageElementRange().getPageElements();
      Logger.log('There are now ' + selectedElements.length + ' page elements selected.');
      break;
    case SlidesApp.SelectionType.TEXT:
      var tableCellRange = selection.getTableCellRange();
      if (tableCellRange != null) {
        var tableCell = tableCellRange.getTableCells()[0];
        Logger.log('Selected text is in a table at row ' +
                  tableCell.getRowIndex() + ', column ' +
                  tableCell.getColumnIndex());
      }
      var textRange = selection.getTextRange();
      if (textRange.getStartIndex() == textRange.getEndIndex()) {
        Logger.log('Text cursor position: ' + textRange.getStartIndex());
      } else {
        Logger.log('Selection is a text range from: ' + textRange.getStartIndex() + ' to: ' +
                  textRange.getEndIndex() + ' is selected');
      }
      break;
    case SlidesApp.SelectionType.TABLE_CELL:
      var tableCells = selection.getTableCellRange().getTableCells();
      var table = tableCells[0].getParentTable();
      Logger.log('There are ' + tableCells.length + ' table cells selected.');
      break;
    case SlidesApp.SelectionType.PAGE:
      var pages = selection.getPageRange().getPages();
      Logger.log('There are ' + pages.length + ' pages selected.');
      break;
    default:
      break;
  }

}//end selectSimilar
