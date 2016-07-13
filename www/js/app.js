(function(){
  'use strict';

  var module = ons.bootstrap('my-app', []);
  module.controller('AppController', function($scope, $http) { 
    
    var loadTeacher = function() {
      $http.get('http://livechatdata-c.sakura.ne.jp/compare-staging/apis/instructors')
        .success(function(response){
          $scope.instructors = response;
          console.log(JSON.stringify(response));
        }).error(function(response){
          console.log(response);
        });
    };
    loadTeacher();

    $scope.getInfo = function(e){
      var id = $(e.target).data('id');
      $http.get('http://compare.fdc-inc.com/apis/commentsByInsId/'+id)
          .success(function(response){
            $scope.comments = response;
            //console.log(JSON.stringify(response));
          }).error(function(response){
            console.log(response);
          });
    };

    $scope.getInsInfo = function(id){
       angular.forEach($scope.instructors, function(getinfo){
        if(id == getinfo.Instructor.id){
          
          $scope.insMsg = getinfo.Instructor.message;
          $scope.insComment = getinfo.Instructor.eval_comment;
          $scope.hobby = getinfo.Instructor.hobby;
          $scope.workplace = getinfo.Instructor.work_place;
        }
      });
    }

    $scope.getMessage = function(){
      app.navi.pushPage('message.html');
    };

    $scope.getReview = function(){
      app.navi.pushPage('review.html');
    };

    //SITES
    var loadSite = function() {
      $http.get('http://compare.fdc-inc.com/apis/sites')
        .success(function(response){
          $scope.sites = response;
          //console.log(JSON.stringify(response));
        }).error(function(response){
          alert(response);
        });
    };
    loadSite();

    $scope.getSiteInfo = function(id){
      angular.forEach($scope.sites, function(getinfo){

        if(id == getinfo.Site.id){
          $scope.name = getinfo.Site.site_name;
          $scope.numTeacher = getinfo.Site.no_teachers;
          $scope.url = getinfo.Site.site_url_display;
          $scope.fTrial = getinfo.Site.trial_lesson;
          $scope.adFee = getinfo.Site.admission_fee;
          $scope.payment = getinfo.Site.payment_method;
          $scope.content = getinfo.Site.site_content;
        }
      });
    }

  });

  var currentItem = {};

  $(document).on('pageinit', '#detail-page', function() {
    $('.item-name', this).text(currentItem.name);
    $('.item-gender', this).text(currentItem.gender);
    $('.item-age', this).text(currentItem.age);
    $('.item-id', this).attr('data-id', currentItem.id);
    $('.item-desc', this).text(currentItem.desc);
    $('.item-thumDetail',this).attr('src', currentItem.thumDetail);
  });

  $(document).on('click','#list-page .item',function(){
    currentItem = {
        name : $('.item-name', this).text(),
        gender : $('.item-gender', this).text(),
        age : $('.item-age', this).text(),
        desc : $('.item-desc', this).text(),
        id : $('.item-id', this).text(),
        thumDetail : $('.item-thum', this).attr('src')
      };
     app.navi.pushPage('detail.html');
  });

  /*sites*/
  $(document).on('click', '#site-page ,item', function(){
    app.navi.pushPage('detail.html');
  });


})();

