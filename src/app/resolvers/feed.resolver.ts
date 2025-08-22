import { ResolveFn } from "@angular/router";
import { Feed } from "../Models/Feed";
import { FeedApiService } from "../api/feed-api.service";
import { inject } from "@angular/core";

export const feedResolver: ResolveFn<Feed> = (route, state) => {
  return inject(FeedApiService).findById(parseInt(<string>route.paramMap.get("id")) );
};
