//Jorge Maldonado.
defineBehavior("tab", function (document)
{
    return {
        goTo: goTo,
        setDefaultTab: setDefaultTab
    };
    function goTo(tab, element)
    {
        var elements = document.getElementsByClassName("tab-area");
        var tabs = document.getElementsByClassName("nav-tab-option");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].className = tabs[i].className.replace("nav-tab-selected", "").trim();
        }
        element.parentNode.className = element.parentNode.className.trim() + " nav-tab-selected";
        document.getElementsByClassName(tab)[0].style.display = "block";
    }

    function setDefaultTab(tab, element)
    {
        appData.tabStatus.defaultTab = tab;
        appData.tabStatus.defaultTabElement = element.id;
    }

})