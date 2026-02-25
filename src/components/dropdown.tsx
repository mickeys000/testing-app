import { Button } from "@os-frontend/components/primitives/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@os-frontend/components/primitives/dropdown-menu";
import { Icon } from "@os-frontend/components/primitives/icon";
import ContentCopyIcon from "@material-symbols/svg-500/sharp/content_copy.svg";
import DeleteIcon from "@material-symbols/svg-500/sharp/delete.svg";
import KeyboardArrowDownIcon from "@material-symbols/svg-500/sharp/keyboard_arrow_down.svg";
import ShareIcon from "@material-symbols/svg-500/sharp/share.svg";

export const Dropdown = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="secondary">
                    Manage
                    <Icon>
                        {/* <KeyboardArrowDownIcon /> */}
                    </Icon>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
                <DropdownMenuContent align="start" sideOffset={6}>
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Button variant="ghost" width="full">
                                <Icon>
                                    {/* <ShareIcon /> */}
                                </Icon>
                                Share
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Button variant="ghost" width="full">
                                <Icon>
                                    {/* <ContentCopyIcon /> */}
                                </Icon>
                                Duplicate
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Button destructive variant="ghost" width="full">
                                <Icon>
                                    {/* <DeleteIcon /> */}
                                </Icon>
                                Permanently Delete
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenuPortal>
        </DropdownMenu>
    );
};
