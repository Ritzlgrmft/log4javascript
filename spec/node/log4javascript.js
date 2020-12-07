if (typeof log4javascript != "object") {
  if (typeof require == "function") {
    var log4javascript = require("../../log4javascript.js");
  }
}

describe("Log4JavaScript module tests", function() {
  var appender;
  beforeEach(function() {
    appender = new log4javascript.Appender();
    appender.clear = function() {
      this.events = [];
    };
    appender.clear();
    appender.append = function(loggingEvent) {
      this.events.push(loggingEvent);
    };
  });

  it("works as we expect on a barebones operation", function() {
    // README:  Each new test should create its own logger object.
    var logger = log4javascript.getLogger("test.log4javascript.barebones");
    logger.addAppender(appender);

    let infoMessage = { toString: () => "infoMessage" };
    logger.info("test 1", infoMessage);
    expect(Array.isArray(appender.events)).toBe(true);
    expect(appender.events.length).toBe(1);
    if (appender.events.length > 0) {
      let event = appender.events[0];
      expect(event.level).toBe(log4javascript.Level.INFO);
      expect(Array.isArray(event.messages)).toBe(true);
      expect(event.messages.length).toBe(2);
      if (event.messages.length > 0) {
        let message = event.messages[0];
        expect(message).toBe("test 1");
      }
      if (event.messages.length > 1) {
        let message = event.messages[1];
        expect(message).toBe(infoMessage);
      }
    }
  });
});
