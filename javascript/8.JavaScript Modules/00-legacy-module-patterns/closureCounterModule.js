"use strict"


globalThis.ticketCounterModule = (() => {
  let nextTicketNumber = 3000;

  function createTicketCode () {
    nextTicketNumber +=1;
    return `TCK - ${nextTicketNumber}`;
  }
  function readNextTicketPreview () {
    return `TCK - ${nextTicketNumber + 1}`;
  }
  return {
    createTicketCode,
    readNextTicketPreview
  };
})();