var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  
  var instruments = [{
    name: 'BOOM',
    source: new Howl({
      src: ['./sounds/boom.wav']
    })
  }, {
    name: 'CLAP',
    source: new Howl({
      src: ['./sounds/clap.wav']
    })
  }, {
    name: 'HIHAT',
    source: new Howl({
      src: ['./sounds/hihat.wav']
    })
  }, {
    name: 'KICK',
    source: new Howl({
      src: ['./sounds/kick.wav']
    })
  }, {
    name: 'OPENHAT',
    source: new Howl({
      src: ['./sounds/openhat.wav']
    })
  }, {
    name: 'RIDE',
    source: new Howl({
      src: ['./sounds/ride.wav']
    })
  }, {
    name: 'SNARE',
    source: new Howl({
      src: ['./sounds/snare.wav']
    })
  }, {
    name: 'TINK',
    source: new Howl({
      src: ['./sounds/tink.wav']
    })
  }, {
    name: 'TOM',
    source: new Howl({
      src: ['./sounds/tom.wav']
    })
  } ];
  
  var ROWS = instruments.length;
  var NOTES = 16;
  
  var itemInterval;
  var beat = 1;
  
   Sequencizer = function () {
    function Sequencizer(item) {
      _classCallCheck(this, Sequencizer);
  
      this.item = item;
      this.playButton = $('#play');
      this.bpmMeter = $('#bpm');
      this.controls = $('[data-bpm]');
      this.initNotes();
  
      this.currentBeat = 0;
      this.isPlaying = false;
  
      this.notes.on('click', this.click.bind(this));
      this.rows.find('.sq-instrument').on('click', this.muteRow.bind(this));
  
      this.bpm = this.bpmMeter.val();
      this.controls.on('click', this.setBpmClick.bind(this));
      this.bpmMeter.on('change', this.setBpmFromInput.bind(this));
    }
  
    _createClass(Sequencizer, [{
      key: 'initNotes',
      value: function initNotes() {
        var row, note;
        for (var i = 0; i < ROWS; i++) {
          row = $('<div data-instrument="' + instruments[i].name + '" class="sq-row" />');
          note = $('<span class="sq-instrument">' + instruments[i].name + '</span>');
          row.append(note);
          for (var j = 0; j < NOTES; j++) {
            note = $('<span data-note-index="' + j + '" class="sq-note" />');
            row.append(note);
          }
          row.appendTo(this.item);
        }
  
        this.rows = this.item.find('.sq-row');
        this.notes = this.item.find('.sq-note');
      }
    }, {
      key: 'click',
      value: function click(e) {
        var target = $(e.currentTarget);
        target.toggleClass('active');
        this.start();
      }
    }, {
      key: 'play',
      value: function play() {
        var current = void 0;
        var children = void 0;
        var row = void 0;
  
        for (var i = 0; i < this.rows.length; i++) {
          row = $(this.rows[i]);
          children = row.children();
          children.removeClass('step');
          current = children.eq(beat);
          current.addClass('step');
  
          //If row has muted class, do not play this complete row
          if (row.hasClass('is-muted')) continue;
  
          //Play row
          if (current.hasClass('active')) {
            switch (current.parent().data('instrument')) {
              case 'BOOM':
                {
                  instruments[0].source.play();
                  break;
                }
              case 'CLAP':
                {
                  instruments[1].source.play();
                  break;
                }
              case 'HIHAT':
                {
                  instruments[2].source.play();
                  break;
                }
              case 'KICK':
                {
                  instruments[3].source.play();
                  break;
                }
              case 'OPENHAT':
                {
                  instruments[4].source.play();
                  break;
                }
              case 'RIDE':
                {
                  instruments[5].source.play();
                  break;
                }
              case 'SNARE':
                {
                  instruments[6].source.play();
                  break;
                }
              case 'TINK':
                {
                  instruments[7].source.play();
                  break;
                }
              case 'TOM':
                {
                  instruments[8].source.play();
                  break;
                }
            }
          }
        }
  
        // Start over at last child
        if (beat < NOTES) {
          ++beat;
        } else {
          beat = 1; //Start at 1 because first child is the title
        }
      }
    }, {
      key: 'setBpmClick',
      value: function setBpmClick(e) {
        var type = $(e.target).data('bpm');
        if (type == 'increase') {
          this.bpm = parseInt(this.bpm) + 1;
        } else {
          this.bpm = parseInt(this.bpm) - 1;
        }
        this.bpmMeter.val(this.bpm);
        this.setBpmFromInput();
      }
    }, {
      key: 'setBpmFromInput',
      value: function setBpmFromInput() {
        this.isPlaying = false;
        clearInterval(itemInterval);
        this.bpm = this.bpmMeter.val();
        this.start();
      }
    }, {
      key: 'start',
      value: function start() {
        var numberOfActiveNotes = this.item.find('.sq-note.active').length;
        if (!this.isPlaying) {
          this.isPlaying = true;
          itemInterval = setInterval(this.play.bind(this), 1000 * 60 / this.bpm / 4);
        } else if (numberOfActiveNotes == 0) {
          this.isPlaying = false;
          clearInterval(itemInterval);
          beat = 1;
          this.notes.removeClass('step');
        }
      }
    }, {
      key: 'muteRow',
      value: function muteRow(e) {
        var row = $(e.currentTarget).parents('.sq-row');
        // row.toggleClass('is-muted');
        // 		let numberOfActiveNotes = this.item.find('.sq-note.active').length;
        // 		if(numberOfActiveNotes <= 0)
        // 			return;
  
        // 		$(e.currentTarget).parents('.sq-row').children().removeClass('active'); //Remove all active notes on clicked row
        // 		this.start();
      }
    }]);
  
     return Sequencizer;
  }();
  $(function () {
    new Sequencizer($('#sequencizer'))
}
);

function jqclear()
  {$( ".sq-note.active" ).click()}