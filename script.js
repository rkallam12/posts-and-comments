
var app = angular.module('postsAndComments', []);

app.service('rest', function($http){
    this.getPosts = function(){
        return $http.get('http://jsonplaceholder.typicode.com/posts')
    }

    this.getComments = function(){
        return $http.get('http://jsonplaceholder.typicode.com/comments')
    }   
})

app.controller('controller', ['$scope', '$rootScope', 'rest', function($scope, $rootScope, rest){
    rest.getPosts()
        .success(function(res){
            console.log(res)
            $scope.postData = res;
        })
        .error(function(){
            console.log(err)
        })

    rest.getComments()
            .success(function(result){
                console.log(result)
                $scope.commentData = result;
            })
            .error(function(){
                console.log(error)
            })

    $scope.deletePost = function(id){
        console.log(id);
        $scope.postData.splice(id-1,1);
    }

    $scope.getComments = function(index){
        if($scope.view){
            if($scope.view == index){
                $scope.view = undefined;
            }else{
                $scope.view = index;
            }
        }else{
            $scope.view = index;
        }
    }

    $scope.deleteComment = function(idx){
        console.log(idx);
        $scope.commentData.splice(idx,1);
    }
}])

app.directive('post', function(){
    return {
        templateUrl: 'templates/posts.html',
        scope: {
            postData: "@",
            indexVal: "@",
            postId: "@",
            deletePostFunction: "&",
            getCommentsFunction: "&"
        }
    }   
})

app.directive('comment', function(){
    return {
        templateUrl: 'templates/comments.html',
        scope: {
            commentData: "=",
            postId: "@",
            deleteCommentFunction: "&"
        }
    }   
})