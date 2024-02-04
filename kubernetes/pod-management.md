# Pod Management

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Force delete a pod](#force-delete-a-pod)
- [Delete pods that are evicted](#delete-pods-that-are-evicted)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Force delete a pod

Sometimes pods aren't fully deleted due to external errors e.g. image doesn't
exist (but used to exist)... so they still appear in your deployment and take up resources. You
would like to delete them, but you can't delete them very easily through your
management UI or programmatically.

`kubectl delete pod <PODNAME> --grace-period=0 --force --namespace <NAMESPACE>`

## Delete pods that are evicted

Pods can be evicted from an instance for many reasons. Most commonly, this is due
to a starvation of resources. These can end up polluting your cluster because
they aren't automatically removed.

You can run the following command in a cron job to periodically sterilize your
cluster of pods of inactive evicted pods.

```sh
function deleteEvictedPods() {
  environments=(
    development
    staging
    production
    traefik
    kube-system
    kube-public
    kube-node-lease
    default
  )

  for environment in "${environments[@]}"; do
    echo "==================================================================================="
    echo "==================================================================================="
    echo "Removing evicted pods for namespace: \"${environment}\""
    echo "---------------------------------------------------"

    for each in $(kubectl get pods -n ${environment} | grep Evicted | awk '{print $1}'); do
      kubectl delete pods $each -n ${environment}
    done
    echo "==================================================================================="
    echo "==================================================================================="
  done
}
```
