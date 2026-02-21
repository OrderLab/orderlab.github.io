$(function() {
  "use strict";

  var nav_offset_top = $('header').height() + 50;
    /*-------------------------------------------------------------------------------
	  Navbar
	-------------------------------------------------------------------------------*/
    function navbarFixed(){
        if ( $('.header_area').length ){
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();
                if (scroll >= nav_offset_top ) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();

    /*----------------------------------------------------*/
    /*  Course Slider
      /*----------------------------------------------------*/
    function active_course() {
      if ($(".active_course").length) {
        $(".active_course").owlCarousel({
          loop: true,
          margin: 20,
          items: 3,
          nav: true,
          dots: false,
          responsiveClass: true,
          thumbs: true,
          thumbsPrerendered: true,
          navText: ["<img src='assets/img/prev.png'>", "<img src='assets/img/next.png'>"],
          responsive: {
            0: {
              items: 1,
              margin: 0
            },
            991: {
              items: 2,
              margin: 30
            },
            1200: {
              items: 3,
              margin: 30
            }
          }
        });
      }
    }
    active_course();

    /*----------------------------------------------------*/
    /*  Event Slider
      /*----------------------------------------------------*/
    function active_event() {
      if ($(".active_event").length) {
        $(".active_event").owlCarousel({
          loop: true,
          margin: 30,
          items: 2,
          nav: false,
          autoplay: 2500,
          smartSpeed: 1500,
          dots: false,
          responsiveClass: true,
          thumbs: true,
          thumbsPrerendered: true
        });
      }
    }
    active_event();

    /*----------------------------------------------------*/
    /*  News cards slider
      /*----------------------------------------------------*/
    function newscards_slider() {
      if ($(".newscard_slider").length) {
        $(".newscard_slider").owlCarousel({
          loop: true,
          margin: 10,
          items: 4,
          dots: true,
          responsiveClass: true,
          responsive: {
            0: {
              items: 2
            },
            991: {
              items: 3
            }
          }
        });
      }
    }
    newscards_slider();


    /*-------------------------------------------------------------------------------
	  testimonial slider
	-------------------------------------------------------------------------------*/
    if ($('.testimonial').length) {
      $('.testimonial').owlCarousel({
          loop: true,
          margin: 30,
          items: 5,
          nav: false,
          dots: true,
          responsiveClass: true,
          slideSpeed: 3000,
          paginationSpeed: 500,
          responsive: {
              0: {
                  items: 1
              }
          }
      })
    }

    function classifyPubLink(label, href) {
      var text = (label || "").toLowerCase();
      var url = (href || "").toLowerCase();

      if (url.indexOf("github.com") !== -1) return "github";
      if (text.indexOf("citation") !== -1 || /\.bib($|\?)/.test(url)) return "citation";
      if (text.indexOf("slide") !== -1 || url.indexOf("slides/") !== -1) return "slides";
      if (text.indexOf("software") !== -1) return "software";
      if (text.indexOf("arxiv") !== -1 || url.indexOf("arxiv.org") !== -1) return "arxiv";
      if (text.indexOf("video") !== -1 || url.indexOf("youtu") !== -1) return "video";
      if (text.indexOf("tech report") !== -1 || text.indexOf("report") !== -1) return "report";
      if (text.indexOf("website") !== -1) return "website";
      return "link";
    }

    function iconForPubLink(type) {
      var map = {
        citation: "fas fa-quote-right",
        slides: "fas fa-chalkboard",
        software: "fas fa-code",
        github: "fab fa-github",
        arxiv: "fas fa-file-alt",
        video: "fas fa-play-circle",
        report: "fas fa-file-alt",
        website: "fas fa-globe-americas",
        link: "fas fa-link"
      };
      return map[type] || map.link;
    }

    function parseGitHubRepo(href) {
      if (!href) return null;
      var match = href.match(/github\.com\/([^\/]+)\/([^\/#?]+)/i);
      if (!match) return null;
      return {
        owner: match[1],
        repo: match[2]
      };
    }

    function formatStarCount(count) {
      if (count >= 1000000) return (count / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
      if (count >= 1000) return (count / 1000).toFixed(1).replace(/\.0$/, "") + "k";
      return String(count);
    }

    function attachGitHubStars($link) {
      var repo = parseGitHubRepo($link.attr("href"));
      if (!repo || $link.find(".gh-stars").length) return;

      var cacheKey = "orderlab-gh-stars-" + repo.owner + "/" + repo.repo;
      var cached = null;
      try {
        cached = localStorage.getItem(cacheKey);
      } catch (e) {}

      var $badge = $('<span class="gh-stars" aria-label="GitHub stars"><i class="fas fa-star" aria-hidden="true"></i> ...</span>');
      $link.append($badge);

      if (cached) {
        var parsed = null;
        try {
          parsed = JSON.parse(cached);
        } catch (e) {}
        if (parsed && parsed.stars >= 0 && (Date.now() - parsed.ts) < 86400000) {
          $badge.html('<i class="fas fa-star" aria-hidden="true"></i> ' + formatStarCount(parsed.stars));
          return;
        }
      }

      fetch("https://api.github.com/repos/" + repo.owner + "/" + repo.repo, { headers: { "Accept": "application/vnd.github+json" } })
        .then(function(resp) {
          if (!resp.ok) throw new Error("GitHub API request failed");
          return resp.json();
        })
        .then(function(data) {
          if (!data || typeof data.stargazers_count !== "number") return;
          var stars = data.stargazers_count;
          $badge.html('<i class="fas fa-star" aria-hidden="true"></i> ' + formatStarCount(stars));
          try {
            localStorage.setItem(cacheKey, JSON.stringify({ stars: stars, ts: Date.now() }));
          } catch (e) {}
        })
        .catch(function() {
          $badge.remove();
        });
    }

    function enhancePublicationLinks() {
      if (!$("body").hasClass("page-publications")) return;

      $(".publications a.publinkitem").each(function() {
        var $link = $(this);
        if ($link.attr("data-enhanced") === "true") return;

        var label = $.trim($link.text());
        var href = $link.attr("href") || "";
        var type = classifyPubLink(label, href);
        var iconClass = iconForPubLink(type);

        $link.empty();
        $link.append('<i class="pub-link-icon ' + iconClass + '" aria-hidden="true"></i>');
        $link.append('<span class="pub-link-label">' + label + '</span>');
        $link.attr("data-enhanced", "true");

        if (type === "github" || href.toLowerCase().indexOf("github.com") !== -1) {
          attachGitHubStars($link);
        }
      });

      $(".publications a[href*='github.com']").each(function() {
        attachGitHubStars($(this));
      });
    }

    enhancePublicationLinks();

});
