with import <nixpkgs> {};
mkShell {
  nativeBuildInputs = [
    ruby
    pre-commit
  ];
  shellHook = ''
    export PATH=$PATH:/home/e/.local/share/gem/ruby/3.3.0/bin
  '';
}
