/* eslint-env browser */
/* global $, describe, it, expect, allFeeds, beforeEach, loadFeed */

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
         */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    /**
     * @description A test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('each feed url is defined', function() {
      for (let feed of allFeeds) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      }
    });

    /**
     * @description A test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('each feed name is defined', function() {
      for (let feed of allFeeds) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      }
    });
  });

  /**
   * @description A new test suite named "The menu"
   */
  describe('The menu', function() {
    /**
   * @description A test that ensures the menu element is
   * hidden by default. You'll have to analyze the HTML and
   * the CSS to determine how we're performing the
   * hiding/showing of the menu element.
   */
    it('is hidden by default', function() {
      expect(document.querySelector('body')
          .classList.contains('menu-hidden')).toBe(true);
    });

    /**
   * @description A test that ensures the menu changes
   * visibility when the menu icon is clicked. This test
   * should have two expectations: does the menu display when
   * clicked and does it hide when clicked again.
   */
    it('visibility toggles on click', function() {
      document.querySelector('.menu-icon-link').click();
      expect(document.querySelector('body').classList.contains('menu-hidden'))
          .toBe(false);
      document.querySelector('.menu-icon-link').click();
      expect(document.querySelector('body').classList.contains('menu-hidden'))
          .toBe(true);
    });
  });// end 'The menu' test suite

  /**
   * @description A new test suite named "Initial Entries"
   */
  describe('Initial Entries', function() {
    beforeEach(function(done) {
      loadFeed(0, done);
    });
    /**
   * @description A test that ensures when the loadFeed
   * function is called and completes its work, there is at least
   * a single .entry element within the .feed container.
   * Remember, loadFeed() is asynchronous so this test will require
   * the use of Jasmine's beforeEach and asynchronous done() function.
   */
    it('there is at least one', function() {
      expect(document.querySelector('.feed').children.length > 0).toBe(true);
    });
  });// end 'Initial Entries' test suite

  /**
   * @description A new test suite named "New Feed Selection"
   */
  describe('New Feed Selection', function() {
    const feed = document.querySelector('.feed');
    const firstFeed = [];
    beforeEach(function(done) {
      loadFeed(0);
      Array.from(feed.children).forEach(function(entry) {
        firstFeed.push(entry.innerText);
      });
      loadFeed(1, done);
    });

    /**
   * @description A test that ensures when a new feed is loaded
   * by the loadFeed function that the content actually changes.
   * Remember, loadFeed() is asynchronous.
   */
    it('results in content changing', function() {
      Array.from(feed.children).forEach(function(entry, index) {
        // console.log('this entry: ', entry.innerText, 'first feed: ', firstFeed[index], 'matching? ',
        //     entry.innerText === firstFeed[index]);
        expect(entry.innerText === firstFeed[index]).toBe(false);
      });
    });
  });// end 'New Feed Selection' test suite
}());
