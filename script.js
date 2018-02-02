
var app = angular.module('postsAndComments', []);

app.service('rest', function($http){
    this.getPosts = function(){
        return $http.get('http://jsonplaceholder.typicode.com/posts')
    }

    this.getComments = function(num){
        return $http.get('http://jsonplaceholder.typicode.com/posts/'+num+'/comments')
    }
    
})

app.controller('postController', ['$scope', '$rootScope', 'rest', function($scope, $rootScope, rest){
    $scope.name = 'This is name';
    rest.getPosts()
        .success(function(res){
            console.log(res)
            $scope.postData = res;
        })
        .error(function(){
            console.log(err)
        })

    $scope.deletePost = function(id){
        $scope.postData.splice(id,1);
    }
}])

app.controller('commentController', ['$scope', 'rest', '$rootScope', function($scope, rest, $rootScope){
    $scope.commentData = "";
    $rootScope.getComments = function(id){
        rest.getComments(id+1)
            .success(function(result){
                console.log(result)
                $scope.commentData = result;
            })
            .error(function(){
                console.log(error)
            })
    }
    $scope.deleteComment = function(idx){
        $scope.commentData.splice(idx,1);
    }
}])

app.directive('post', function(){
    return {
        templateUrl: 'templates/posts.html'
    }   
})

app.directive('comment', function(){
    return {
        templateUrl: 'templates/comments.html'
    }   
})