{ nixpkgs ? import <nixpkgs> { } }:
let pkgs = import ./packages.nix { inherit nixpkgs; }; in
with pkgs;
{
  system = [
    coreutils
    gnugrep
    findutils
    gnused
    jq
    gomplate
  ];

  main = [
    pls
    nodejs-16_x
    pnpm
    gattai
  ];

  dev = [
    pnpm
    webstorm
  ];

  lint = [
    action_docs
    precommit-patch-nix
    pre-commit
    nixpkgs-fmt
    prettier
    shfmt
    shellcheck
    gitlint
    sg
  ];

  ci = [
    git
    awscli2
    wrangler
  ];

  releaser = [
    node18
    sg
  ];
}
