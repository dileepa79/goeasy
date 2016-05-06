System.register(['angular2/core', 'angular2/router', './services/auth.service', './notes/add-note.component', './timeline/timeline.component', './authentication/login.component', './app.constants', './tags/tags.component', './userprofile/userprofile.component', './recenttimeline/recenttimeline.component', './dashboard/dashboard.component', './notifications/notifications.component', './feedback/feedback.component', './services/feedback.service', './tags/tag-detail.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, core_2, auth_service_1, add_note_component_1, timeline_component_1, login_component_1, app_constants_1, tags_component_1, userprofile_component_1, recenttimeline_component_1, dashboard_component_1, notifications_component_1, feedback_component_1, feedback_service_1, tag_detail_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (add_note_component_1_1) {
                add_note_component_1 = add_note_component_1_1;
            },
            function (timeline_component_1_1) {
                timeline_component_1 = timeline_component_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (app_constants_1_1) {
                app_constants_1 = app_constants_1_1;
            },
            function (tags_component_1_1) {
                tags_component_1 = tags_component_1_1;
            },
            function (userprofile_component_1_1) {
                userprofile_component_1 = userprofile_component_1_1;
            },
            function (recenttimeline_component_1_1) {
                recenttimeline_component_1 = recenttimeline_component_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (notifications_component_1_1) {
                notifications_component_1 = notifications_component_1_1;
            },
            function (feedback_component_1_1) {
                feedback_component_1 = feedback_component_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (tag_detail_component_1_1) {
                tag_detail_component_1 = tag_detail_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_router) {
                    this._router = _router;
                    this.isAuthorized = false;
                }
                AppComponent.prototype.ngOnInit = function () {
                    if (this.isAuthorized)
                        this._router.navigate(['Dashboard']);
                    else
                        this._router.navigate(['Login']);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        styleUrls: ['app/app.component.css'],
                        templateUrl: 'app/app.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, userprofile_component_1.UserProfileComponent, notifications_component_1.NotificaitonComponent, feedback_component_1.FeedbackComponent, add_note_component_1.AddNoteComponent],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            core_2.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }),
                            auth_service_1.AuthService,
                            login_component_1.LoginComponent,
                            add_note_component_1.AddNoteComponent,
                            app_constants_1.Configuration,
                            feedback_service_1.FeedbackService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/login',
                            name: 'Login',
                            component: login_component_1.LoginComponent,
                            useAsDefault: true
                        },
                        //{
                        //    path: 'signup',
                        //    name: 'Signup',
                        //    component: AuthService
                        //},
                        {
                            path: '/addnote',
                            name: 'AddNote',
                            component: add_note_component_1.AddNoteComponent
                        },
                        {
                            path: '/timeline',
                            name: 'TimeLine',
                            component: timeline_component_1.TimeLineComponent
                        },
                        {
                            path: '/tags',
                            name: 'Tags',
                            component: tags_component_1.TagsComponent
                        },
                        {
                            path: '/tag/:id',
                            name: 'TagDetail',
                            component: tag_detail_component_1.TagDetailComponent
                        },
                        {
                            path: '/recenttimeline',
                            name: 'RecentTimeline',
                            component: recenttimeline_component_1.RecentTimeLineComponent
                        },
                        {
                            path: '/dashboard',
                            name: 'Dashboard',
                            component: dashboard_component_1.Dashboard
                        }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map