// List out the classes that each component searches for
UW.elements = {

  alert : '.uw-thinstrip',
  accordion  : '.uw-accordion',
  dropdowns  : '#dawgdrops',
  images : 'a > img',
  mobilemenu : '.uw-mobile-menu-toggle',
  radio      : ':radio',
  checkbox   : ':checkbox',
  search     : '#uwsearcharea',
  select     : '.uw-select',
  quicklinks : '.uw-quicklinks',
  slideshow  : '.uw-slideshow',
  social     : '.uw-social',
  vimeo      : '.uw-vimeo',
  youtube    : '.uw-youtube'

}

UW.getBaseUrl = function() {
    if (uw_ismultisite === true) {
      var site = _.first( _.compact( Backbone.history.location.pathname.split('/') ) )
      return Backbone.history.location.origin + ( site ? '/' + site : '' ) + '/'
    } 
      return Backbone.history.location.origin
}

UW.sources = {
  quicklinks : UW.getBaseUrl() + 'wp-admin/admin-ajax.php?action=quicklinks',
  search     : UW.getBaseUrl() + 'wp-admin/admin-ajax.php'
}

// Initialize all components when the DOM is ready
UW.initialize = function( $ )
{
  // Cache common elements that each javascript module calls
  UW.$body       = $('body');
  UW.$window   = $( window );
  UW.baseUrl = UW.getBaseUrl()

  // UW Utilities
  UW.dropdowns  = _.map( $( UW.elements.dropdowns ),     function( element ) { return new UW.Dropdowns({ el : element }) } )
  UW.mobilemenu = _.map( $( UW.elements.mobilemenu ),     function( element ) { return new UW.MobileMenu({ el : element }) } )
  UW.quicklinks = _.map( $( UW.elements.quicklinks ),    function( element ) { return new UW.QuickLinks( { el : element, url : UW.sources.quicklinks }) } )
  UW.search     = _.map( $( UW.elements.search ),    function( element ) { return new UW.Search( { el : element } ) } )
  UW.images   = _.map( $( UW.elements.images ),    function( element ) { return new UW.Image({ el : element }) } )

  // UW Modules
  UW.slideshows = _.map( $( UW.elements.slideshow ), function( element ) { return new UW.Slideshow( { el : element }) } )
  UW.social     = _.map( $( UW.elements.social ),    function( element ) { return new UW.Social({ el : element }) } )
  UW.vimeo      = _.map( $( UW.elements.vimeo ),     function( element ) { return new UW.Vimeo({ el : element }) } )
  UW.youtube    = _.map( $( UW.elements.youtube ),   function( element ) { return new UW.YouTube.Collection({ el: element})})


  // UW Components - These need to render after all other javascript elements are rendered on page
  UW.accordion   = _.map( $( UW.elements.accordion ), function( element ) { return new UW.Accordion( { el : element }) } )
  UW.radio      = _.map( $( UW.elements.radio ),     function( element ) { return new UW.Radio({ el : element }) } )
  UW.checkbox   = _.map( $( UW.elements.checkbox ),     function( element ) { return new UW.Radio({ el : element }) } )
  UW.select     = _.map( $( UW.elements.select ),    function( element ) { return new UW.Select({ el : element }) } )

  UW.alert = new UW.Alert({ after: UW.elements.alert, model: new UW.Alert.Model() });

  // todo: add to separate file
  $('table').addClass('table table-striped')

  $('pre').addClass('prettyprint')

  if ( window.prettyPrint ) prettyPrint()

}

jQuery(document).ready(function(){
  // switching to anonymous function so UW.initialize can be extended before running
  UW.initialize(jQuery);
})


// Basic UW Components
// --------------
