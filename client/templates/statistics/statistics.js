/**
 * Created by HP on 22/11/2015.
 */

Template.statistics.rendered = function () {

    //Couleurs des Pie charts
    var couleurs = ["#F7464A", "#46BFBD", "#FDB45C", "#01b050", "#db0e7f", "#302013","#005399","#5b0051","#eecccc","#077c3e","#37a315","#1528b8","#c82dd2","#d48813","#984907","#f1ff0e"];
    var hilights = ["#FF5A5E", "#5AD3D1", "#FFC870", "#66cc66", "#d10edb", "#674529","#008bff","#66005a","#ffe4ee","#058d45","#3bb815","#2d40d2","#c252c9","#f0a32b","#a35c22","#f7ff71"];

    var regions = Regions.find().fetch();

    var nbreAdherentsRegion = [];
    var nbreRushesRegion = [];
    var nbreActivitesRegion = [];
    var nomRegions = [];
    var nbreHommesRegion = [];
    var nbreFemmesRegion = [];
    var nbreJeunesRegion = [];
    var nbreSeniorsRegion = [];
    var now = moment();

    if (regions) {
        for (var i = 0; i < regions.length; i++) {
            //Début Nombre adhérents par Région*********************
            var adherentsCount = Adherent.find({regionId: regions[i]._id}).count();
            var obj1 = {
                value: adherentsCount,
                color: couleurs[i],
                highlight: hilights[i],
                label: regions[i].nom
            };
            nbreAdherentsRegion.push(obj1);
            //Fin Nombre adhérents par Région*********************


            //Début Nombre Rushes par Région*********************
            var adherentsRegion = Adherent.find({regionId: regions[i]._id}).fetch();
            var rushesCount = 0;
            var jeunesRegion = [];
            var seniorsRegion = [];
            if (adherentsRegion) {
                for (var j = 0; j < adherentsRegion.length; j++) {
                    rushesCount -= (0 - adherentsRegion[j].nombreRuches);
                    if(adherentsRegion[j].dateNaissance){
                        var birthday = moment(adherentsRegion[j].dateNaissance.split('.')[2] + "-" +adherentsRegion[j].dateNaissance.split('.')[1] + "-" +adherentsRegion[j].dateNaissance.split('.')[0]);
                        console.log(birthday);
                        var age = now.diff(birthday, 'years');
                        if(age <= 35){
                            console.log('Jeune : ' + adherentsRegion[j].nom + ' ' + adherentsRegion[j].prenom);
                            console.log(age);
                            jeunesRegion.push(birthday);
                        }else{
                            console.log('Senior : ' + adherentsRegion[j].nom + ' ' + adherentsRegion[j].prenom);
                            console.log(now.diff(birthday, 'years'));
                            seniorsRegion.push(birthday);
                        }
                    }
                }
            }
            var obj2 = {
                value: rushesCount,
                color: couleurs[i],
                highlight: hilights[i],
                label: regions[i].nom
            };
            nbreRushesRegion.push(obj2);
            //Fin Nombre Rushes par Région*********************


            //Début Nombre d'activités par Région*********************
            var activiteCount = Projects.find({regionId: regions[i]._id}).count();
            if (activiteCount > 0) {
                var obj3 = {
                    value: activiteCount,
                    color: couleurs[i],
                    highlight: hilights[i],
                    label: regions[i].nom
                };
                nbreActivitesRegion.push(obj3);
            }
            //Fin Nombre d'activités par Région*********************

            //Début Sexes par Région*********************
            var nbreHRegion =  0;
            nbreHRegion = Adherent.find({regionId:regions[i]._id, sexe:'homme'}).count();
            nbreHommesRegion.push(nbreHRegion);
            var nbreFRegion =  0;
            nbreFRegion = Adherent.find({regionId:regions[i]._id, sexe:'femme'}).count();
            nbreFemmesRegion.push(nbreFRegion);
            //Fin Sexes par Région*********************

            //Début Ages par Région*********************
            nomRegions.push(regions[i].nom);
            //var adherentsRegion = Adherent.find({regionId:regions[i]._id}).fetch();
            //var jeunesRegion = [];
            //var seniorsRegion = [];
            if(adherentsRegion.length > 0){
                for(var k = 0; k < adherentsRegion.length; k++){
                    /*if(adherentsRegion[k].dateNaissance){
                        var birthday = moment(adherentsRegion[k].dateNaissance);
                        console.log(adherentsRegion[k].nom + ' ' + adherentsRegion[k].prenom);
                        console.log(now.diff(birthday, 'years'));
                        if(birthday <= 35){
                            jeunesRegion.push(birthday);
                        }else{
                            seniorsRegion.push(birthday);
                        }
                    }*/ //Déplacé dans la boucle (statistiques des Ruches)*****************
                }
            }
            nbreJeunesRegion.push(jeunesRegion.length);
            nbreSeniorsRegion.push(seniorsRegion.length);
            //Fin Ages par Région*********************
        }
    }

    var dataSexe = {
        labels: nomRegions,
        datasets: [
            {
                label: "Hommes",
                fillColor: "rgba(70,191,189,0.5)",
                strokeColor: "rgba(70,191,189,0.8)",
                highlightFill: "rgba(90,211,209,0.75)",
                highlightStroke: "rgba(90,211,209,1)",
                data: nbreHommesRegion
            },
            {
                label: "Femmes",
                fillColor: "rgba(247,70,74,0.5)",
                strokeColor: "rgba(247,70,74,0.8)",
                highlightFill: "rgba(255,90,94,0.75)",
                highlightStroke: "rgba(255,90,94,1)",
                data: nbreFemmesRegion
            }
        ]
    };

    var dataAge = {
        labels: nomRegions,
        datasets: [
            {
                label: "Jeunes",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: nbreJeunesRegion
            },
            {
                label: "Seniors",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: nbreSeniorsRegion
            }
        ]
    };

    var ctx = $("#myChart").get(0).getContext("2d");
    var myNewChart = new Chart(ctx);
    new Chart(ctx).Pie(nbreRushesRegion);

    var ctx2 = $("#myChart2").get(0).getContext("2d");
    var myNewChart2 = new Chart(ctx2);
    new Chart(ctx2).Bar(dataSexe);

    var ctx3 = $("#myChart3").get(0).getContext("2d");
    var myNewChart3 = new Chart(ctx3);
    new Chart(ctx3).Pie(nbreActivitesRegion);

    var ctx4 = $("#myChart4").get(0).getContext("2d");
    var myNewChart4 = new Chart(ctx4);
    new Chart(ctx4).Pie(nbreAdherentsRegion);

    var ctx5 = $("#myChart5").get(0).getContext("2d");
    var myNewChart5 = new Chart(ctx5);
    new Chart(ctx5).Bar(dataAge);
};

Chart.defaults.global = {
    // Boolean - Whether to animate the chart
    animation: true,

    // Number - Number of animation steps
    animationSteps: 60,

    // String - Animation easing effect
    // Possible effects are:
    // [easeInOutQuart, linear, easeOutBounce, easeInBack, easeInOutQuad,
    //  easeOutQuart, easeOutQuad, easeInOutBounce, easeOutSine, easeInOutCubic,
    //  easeInExpo, easeInOutBack, easeInCirc, easeInOutElastic, easeOutBack,
    //  easeInQuad, easeInOutExpo, easeInQuart, easeOutQuint, easeInOutCirc,
    //  easeInSine, easeOutExpo, easeOutCirc, easeOutCubic, easeInQuint,
    //  easeInElastic, easeInOutSine, easeInOutQuint, easeInBounce,
    //  easeOutElastic, easeInCubic]
    animationEasing: "easeOutQuart",

    // Boolean - If we should show the scale at all
    showScale: true,

    // Boolean - If we want to override with a hard coded scale
    scaleOverride: false,

    // ** Required if scaleOverride is true **
    // Number - The number of steps in a hard coded scale
    scaleSteps: null,
    // Number - The value jump in the hard coded scale
    scaleStepWidth: null,
    // Number - The scale starting value
    scaleStartValue: null,

    // String - Colour of the scale line
    scaleLineColor: "rgba(0,0,0,.1)",

    // Number - Pixel width of the scale line
    scaleLineWidth: 1,

    // Boolean - Whether to show labels on the scale
    scaleShowLabels: true,

    // Interpolated JS string - can access value
    scaleLabel: "<%=value%>",

    // Boolean - Whether the scale should stick to integers, not floats even if drawing space is there
    scaleIntegersOnly: true,

    // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero: false,

    // String - Scale label font declaration for the scale label
    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Scale label font size in pixels
    scaleFontSize: 12,

    // String - Scale label font weight style
    scaleFontStyle: "normal",

    // String - Scale label font colour
    scaleFontColor: "#666",

    // Boolean - whether or not the chart should be responsive and resize when the browser does.
    responsive: false,

    // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
    maintainAspectRatio: true,

    // Boolean - Determines whether to draw tooltips on the canvas or not
    showTooltips: true,

    // Function - Determines whether to execute the customTooltips function instead of drawing the built in tooltips (See [Advanced - External Tooltips](#advanced-usage-custom-tooltips))
    customTooltips: false,

    // Array - Array of string names to attach tooltip events
    tooltipEvents: ["mousemove", "touchstart", "touchmove"],

    // String - Tooltip background colour
    tooltipFillColor: "rgba(0,0,0,0.8)",

    // String - Tooltip label font declaration for the scale label
    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip label font size in pixels
    tooltipFontSize: 14,

    // String - Tooltip font weight style
    tooltipFontStyle: "normal",

    // String - Tooltip label font colour
    tooltipFontColor: "#fff",

    // String - Tooltip title font declaration for the scale label
    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

    // Number - Tooltip title font size in pixels
    tooltipTitleFontSize: 14,

    // String - Tooltip title font weight style
    tooltipTitleFontStyle: "bold",

    // String - Tooltip title font colour
    tooltipTitleFontColor: "#fff",

    // Number - pixel width of padding around tooltip text
    tooltipYPadding: 6,

    // Number - pixel width of padding around tooltip text
    tooltipXPadding: 6,

    // Number - Size of the caret on the tooltip
    tooltipCaretSize: 8,

    // Number - Pixel radius of the tooltip border
    tooltipCornerRadius: 6,

    // Number - Pixel offset from point x to tooltip edge
    tooltipXOffset: 10,

    // String - Template string for single tooltips
    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",

    // String - Template string for multiple tooltips
    multiTooltipTemplate: "<%= value %>",

    // Function - Will fire on animation progression.
    onAnimationProgress: function () {
    },

    // Function - Will fire on animation completion.
    onAnimationComplete: function () {
    }
}