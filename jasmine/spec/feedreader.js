/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     *
     * Note: even thought test and the next could be refactored into
     * one forEach loop, they are kept separate for more succinct
     * test display results
     */

    it('have a defined URL and the URL is not empty', function () {

      allFeeds.forEach(function (feed) {

        var currentURL = feed.url;
        //make sure it's not undefined
        expect(currentURL).not.toBe(undefined);
        //make sure it's not an empty string
        expect(currentURL).not.toBe('');
        //make sure it at least contains 'http', which means 'https' will work too
        expect(currentURL).toContain('http');

      });
    });


    /* Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */

    it('have a defined Name and the Name is not empty', function () {

      allFeeds.forEach(function (feed) {

        var currentName = feed.name;
        //make sure it's not undefined
        expect(currentName).not.toBe(undefined);
        //make sure it's not an empty string
        expect(currentName).not.toBe('');
      });
    });
  });//end RSS feeds tests


  /* Write a new test suite named "The menu" */

  describe('The menu', function () {

    /* Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */

    it('is hidden by default', function () {
      //the body should have the class 'menu-hidden' on load, based on code
      var hiddenOnLoad = $('body').hasClass('menu-hidden');
      expect(hiddenOnLoad).toBe(true);

    });


    /* Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */

    it('changes visibility when the menu icon is clicked', function () {

      var menuIcon = $('.menu-icon-link');

      //check that it is visible on click, so it should not have the 'menu-hidden' class
      menuIcon.click();
      expect(document.body.classList.contains('menu-hidden')).toBeFalsy();
      //check that it is invisible on click, so it should have the 'menu-hidden' class
      menuIcon.click();
      expect(document.body.classList.contains('menu-hidden')).toBeTruthy();

    });

  }); // end The menu tests


  /* Write a new test suite named "Initial Entries" */

  describe('Initial Entries', function () {

    /* Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */

    //do the async shuffle!
    beforeEach(function (done) {
      loadFeed(0, done);
    });

    it('contain at least a single .entry element within the .feed container', function (done) {
      var elem = ($('.entry'));
      //if there is at least one element with an 'entry' class, that means it is defined.
      expect(elem).toBeDefined();
      expect(elem.length).toBeGreaterThan(0);
      done();
    });


  }); // end Initial Entries suite

  /* Write a new test suite named "New Feed Selection" */

  describe('New Feed Selection', function () {

    /* Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */

    //check a random feed that is not the first feed, just incase there are more than 4 feeds ever.
    var rand = Math.floor((Math.random() * allFeeds.length - 1 ) + 1);
    var initialContent, finalContent;

    beforeEach(function (done) {
      loadFeed(0, function () {
        initialContent = $('.header .header-title').html();
        loadFeed(rand, function () {
            finalContent = $('.header .header-title').html();
            done();
        });
      });
    });

    it('when a new feed is loaded by the loadFeed function, the content actually changes', function (done) {
      //check to make sure the header title of the initial and final content are different
      expect(initialContent !== finalContent).toBeTruthy();
      done();
    });
  }); //end New Feed Selection suite


}());
