// lets try to implement the smooth scroll in all anchor tags in nav items 
var navMenuAnchorTags = document.querySelectorAll(".nav-items a");
console.log(navMenuAnchorTags);
for (let i = 0; i < navMenuAnchorTags.length; i++) {
    navMenuAnchorTags[i].addEventListener("click", function (e) {
        e.preventDefault();

        var targetSectionID = this.textContent.trim().toLowerCase();
        console.log(targetSectionID);

        var targetSection = document.getElementById(targetSectionID);
        console.log(targetSection);
        // this is done scrolling from top to down only
        // var id=setInterval(function () {
        //     var targetSectionCoordinates = targetSection.getBoundingClientRect();
        //     if (targetSectionCoordinates.top <= 0) {
        //         clearInterval(id);
        //         return;
        //     }
        //     window.scrollBy(0, 10);
        // }, 10);

        // if want that scrolling also when down on page and selected home means scrolling from bottom to top
        var initialCoordinates = targetSection.getBoundingClientRect().top;
        if (initialCoordinates >= 0) {
            var id=setInterval(function () {
                var targetSectionCoordinates = targetSection.getBoundingClientRect();
                if (targetSectionCoordinates.top <= 0) {
                    clearInterval(id);
                    return;
                }
                window.scrollBy(0, 10);
            }, 10);
        }
        else {
            var id=setInterval(function () {
                var targetSectionCoordinates = targetSection.getBoundingClientRect();
                if (targetSectionCoordinates.top >= 0) {
                    clearInterval(id);
                    return;
                }
                window.scrollBy(0, -10);
            }, 10);
        }
    });

}