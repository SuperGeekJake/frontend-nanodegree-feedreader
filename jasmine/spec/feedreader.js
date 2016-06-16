
/* globals describe, it, beforeEach, $, allFeeds, loadFeed
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  var $body = $('body');
  var $menuIcon = $('.menu-icon-link');
  var $feedContainer = $('.feed');

  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {

    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     * The "are defined" spec fails
     */
    it('should be defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    describe('A Feed', function () {

      it('should have a URL', function () {
        allFeeds.forEach(function (feed) {
          expect(feed.url).toBeDefined();
          expect(typeof feed.url).toBe('string');
          expect(feed.url.length).not.toBe(0);
        });
      });

      it('should have a name', function () {
        allFeeds.forEach(function (feed) {
          expect(feed.name).toBeDefined();
          expect(typeof feed.name).toBe('string');
          expect(feed.name.length).not.toBe(0);
        });
      });

    });

  });

  describe('The Menu', function () {

    it('should be hidden', function () {
      expect($body.hasClass('menu-hidden')).toBe(true);
    });

    it('should be toggled when menu icon clicked', function () {
      $menuIcon.trigger('click');
      expect($body.hasClass('menu-hidden')).toBe(false);

      $menuIcon.trigger('click');
      expect($body.hasClass('menu-hidden')).toBe(true);
    });

  });

  describe('Initial Entries', function () {

    beforeEach(function (done) {
      loadFeed(0, done);
    });

    it('should be created', function () {
      var entryNumber = $feedContainer.children('.entry').length;
      expect(entryNumber).not.toBe(0);
    });

  });

  describe('New Feed Selection', function () {
    var firstEntry,
      newFirstEntry;

    beforeEach(function (done) {
      loadFeed(0, setFirstEntry);

      function setFirstEntry() {
        firstEntry = $feedContainer.children('.entry').first();
        loadFeed(1, setNewFirstEntry);
      }

      function setNewFirstEntry() {
        newFirstEntry = $feedContainer.children('.entry').first();
        done();
      }
    });

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    it('should update content', function () {
      expect(firstEntry).not.toBe(newFirstEntry);
    });

  });

}());
