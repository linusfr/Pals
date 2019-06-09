'use strict';

customElements.define(
  'compodoc-menu',
  class extends HTMLElement {
    constructor() {
      super();
      this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
      this.render(this.isNormalMode);
    }

    render(isNormalMode) {
      let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">mean documentation</a>
                </li>

                <li class="divider"></li>
                ${
                  isNormalMode
                    ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>`
                    : ''
                }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="dependencies.html" data-type="chapter-link">
                                <span class="icon ion-ios-list"></span>Dependencies
                            </a>
                        </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${
                              isNormalMode
                                ? 'data-target="#modules-links"'
                                : 'data-target="#xs-modules-links"'
                            }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse" ${
                          isNormalMode
                            ? 'id="modules-links"'
                            : 'id="xs-modules-links"'
                        }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#components-links-module-AppModule-4ead3112bf7b52153905db94771ce741"'
                                            : 'data-target="#xs-components-links-module-AppModule-4ead3112bf7b52153905db94771ce741"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="components-links-module-AppModule-4ead3112bf7b52153905db94771ce741"'
                                            : 'id="xs-components-links-module-AppModule-4ead3112bf7b52153905db94771ce741"'
                                        }>
                                            <li class="link">
                                                <a href="components/AddClubComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddClubComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ChangeProfilePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ChangeProfilePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CreateClubComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CreateClubComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DetailedViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DetailedViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditClubComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditClubComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GroupViewComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">GroupViewComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/JoinedClubsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">JoinedClubsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfilePageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfilePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#injectables-links-module-AppModule-4ead3112bf7b52153905db94771ce741"'
                                        : 'data-target="#xs-injectables-links-module-AppModule-4ead3112bf7b52153905db94771ce741"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-AppModule-4ead3112bf7b52153905db94771ce741"'
                                        : 'id="xs-injectables-links-module-AppModule-4ead3112bf7b52153905db94771ce741"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/ClubService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ClubService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link">AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${
                                          isNormalMode
                                            ? 'data-target="#components-links-module-AuthModule-676cae556216946cd4efc77510f50406"'
                                            : 'data-target="#xs-components-links-module-AuthModule-676cae556216946cd4efc77510f50406"'
                                        }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${
                                          isNormalMode
                                            ? 'id="components-links-module-AuthModule-676cae556216946cd4efc77510f50406"'
                                            : 'id="xs-components-links-module-AuthModule-676cae556216946cd4efc77510f50406"'
                                        }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${
                                      isNormalMode
                                        ? 'data-target="#injectables-links-module-AuthModule-676cae556216946cd4efc77510f50406"'
                                        : 'data-target="#xs-injectables-links-module-AuthModule-676cae556216946cd4efc77510f50406"'
                                    }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${
                                      isNormalMode
                                        ? 'id="injectables-links-module-AuthModule-676cae556216946cd4efc77510f50406"'
                                        : 'id="xs-injectables-links-module-AuthModule-676cae556216946cd4efc77510f50406"'
                                    }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/TokenStorage.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>TokenStorage</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthRoutingModule.html" data-type="entity-link">AuthRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MaterialModule.html" data-type="entity-link">MaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#classes-links"'
                            : 'data-target="#xs-classes-links"'
                        }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${
                          isNormalMode
                            ? 'id="classes-links"'
                            : 'id="xs-classes-links"'
                        }>
                            <li class="link">
                                <a href="classes/AuthHeaderInterceptor.html" data-type="entity-link">AuthHeaderInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="classes/CatchErrorInterceptor.html" data-type="entity-link">CatchErrorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${
                              isNormalMode
                                ? 'data-target="#injectables-links"'
                                : 'data-target="#xs-injectables-links"'
                            }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse" ${
                              isNormalMode
                                ? 'id="injectables-links"'
                                : 'id="xs-injectables-links"'
                            }>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link">CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CometChatApiService.html" data-type="entity-link">CometChatApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CometChatService.html" data-type="entity-link">CometChatService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImageService.html" data-type="entity-link">ImageService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#guards-links"'
                            : 'data-target="#xs-guards-links"'
                        }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${
                          isNormalMode
                            ? 'id="guards-links"'
                            : 'id="xs-guards-links"'
                        }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link">AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${
                          isNormalMode
                            ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"'
                        }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse" ${
                          isNormalMode
                            ? 'id="miscellaneous-links"'
                            : 'id="xs-miscellaneous-links"'
                        }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
      this.innerHTML = tp.strings;
    }
  }
);
